import admin from '../firebase/config';

const auth = admin.auth();
const db = admin.firestore();

export const getUser = async (req, res) => {
    const userId = req.params.userId.trim();
    const doc = await db.collection('users').doc(userId).get();
    const user = doc.data();
    const userFiltered = {
        username: user.username,
        bio: user.bio,
        favorites: user.favorites,
        follows: user.follows,
    };
    if (!doc.exists) {
        res.send('No such document!');
    } else {
        res.json(userFiltered);
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
