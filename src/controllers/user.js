import admin from '../firebase/config';
import {
    validUserBody
} from '../utils/schema';

const auth = admin.auth();
const db = admin.firestore();

export const getUser = async (req, res) => {
    const userId = req.params.userId.trim();
    const doc = await db.collection('users').doc(userId).get();
    if (!doc.exists) {
        res.send('No such document!');
    } else {
        res.json(doc.data());
    }
};

export const getAllUsers = async (req, res) => {
    const docs = await db.collection('users').get();
    if (docs.empty) {
        res.send('No users!');
    } else {
        const users = [];
        docs.forEach((doc) => {
            users.push(doc.data());
        });
        res.json(users);
    }
};

export const createUser = async (req, res) => {
    const body = req.body;
    if (validUserBody(body)) {
        try {
        const authResult = await auth.createUser({
            email: body.email,
            emailVerified: false,
            password: body.password,
            birthdate: body.birthdate
        });
        const setResult = await db.collection('users').doc(authResult.uid).set({
            username: body.username,
            firstname: body.firstname,
            surname: body.surname,
            bio: body.bio,
            follows: body.follows,
            favorites: body.favorites
        });
        const doc = await db.collection('users').doc(authResult.uid).get();
        if (!doc.exists) res.send('Could not create document!');
        else res.json(doc.data());
        } catch (error) {
            res.status(409).send('User already exists!');
        }
    } else {
        res.send('Invalid user schema!');
    }
};