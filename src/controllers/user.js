import admin from '../firebase/config';

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
    const doc = await db.collection('users').doc('4FzxqV1pnYlyWw4qexsS').get();
    if (!doc.exists) {
        res.send('No such document!');
    } else {
        res.json(doc.data());
    }
};

export const createUser = async (req, res) => {
    const user = req.body;
    const doc = await db.collection('users').add(user);
    if (!doc.exists) {
        res.send('Could not create document!');
    } else {
        res.json(doc.data());
    }
};
