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
            const setResult = await db
                .collection('users')
                .doc(body.userId)
                .set({
                    username: body.username,
                    firstname: 'Jane',
                    surname: 'Doe',
                    bio: '',
                    follows: [],
                    favorites: [],
                });
            const doc = await db.collection('users').doc(body.userId).get();
            if (!doc.exists) res.send('Could not create document!');
            else res.status(201).json({ userId: body.userId });
        } catch (error) {
            res.status(409).send(error);
        }
    } else {
        res.status(400).send('Invalid user schema!');
    }
};
