import admin from '../firebase/config';
import { validUserCreateBody, validUserLoginBody } from '../utils/schema';

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
		follows: user.follows
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

export const createUser = async (req, res) => {
	const body = req.body;
	if (validUserCreateBody(body)) {
		try {
			const authResult = await auth.createUser({
				email: body.email,
				emailVerified: false,
				password: body.password,
				birthdate: body.birthdate
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
					favorites: body.favorites
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

export const loginUser = async (req, res) => {
	const body = req.body;
	if (validUserLoginBody(body)) {
		const token = await auth.verifyIdToken(body.token);
		const uid = token.uid;
		console.log(uid);
	} else {
		res.status(400).send('Invalid user schema!');
	}
}

export const checkAuth = async (req, res) => {
	const body = req.body;
}
