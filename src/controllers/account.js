import admin from '../firebase/config';

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