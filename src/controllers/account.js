import admin from '../firebase/config';
import { validUserCreateBody, validUserLoginBody } from '../utils/schema';

const auth = admin.auth();
const db = admin.firestore();

export const getAuthAccount = async (req, res) => {
    const body = req.body;
    if ('token' in body) {
        const token = await auth.verifyIdToken(body.token);
        const uid = token.uid;
        const doc = await db.collection('users').doc(uid).get();
        const account = doc.data();
        if (!doc.exists) {
            res.send('No such document!');
        } else {
            res.json(account);
        }
    } else {
        res.status(400).send('Invalid auth schema!');
    }
};

export const loginAccount = async (req, res) => {
    const body = req.body;
    if (validUserLoginBody(body)) {
        const token = await auth.verifyIdToken(body.token);
        const uid = token.uid;
        const doc = await db.collection('users').doc(uid).get();
        const account = doc.data();
        if (!doc.exists) {
            res.send('No such document!');
        } else {
            res.json(account);
        }
    } else {
        res.status(400).send('Invalid user schema!');
    }
};

export const createAccount = async (req, res) => {
    const body = req.body;
    if (validUserCreateBody(body)) {
        try {
            const authResult = await auth.createUser({
                email: body.email,
                emailVerified: false,
                password: body.password,
                birthdate: body.birthdate,
            });
            const setResult = await db
                .collection('users')
                .doc(authResult.uid)
                .set({
                    username: body.username,
                    firstname: body.firstname,
                    surname: body.surname,
                    bio: body.bio,
                    follows: body.follows,
                    favorites: body.favorites,
                });
            const doc = await db.collection('users').doc(authResult.uid).get();
            if (!doc.exists) res.send('Could not create document!');
            else res.status(201).json({ userId: authResult.uid });
        } catch (error) {
            res.status(409).send('User already exists!');
        }
    } else {
        res.status(400).send('Invalid user schema!');
    }
};
