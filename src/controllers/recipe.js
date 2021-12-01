import admin from '../firebase/config';

const db = admin.firestore();

export const getRecipe = async (req, res) => {
	const recipeId = req.params.recipeId.trim();
	const doc = await db.collection('recipes').doc(recipeId).get();
	if (!doc.exists) {
		res.send('No such document!');
	} else {
		res.json(doc.data());
	}
};

export const getAllRecipes = async (req, res) => {
	const docs = await db.collection('recipes').get();
	if (docs.empty) {
		res.send('No recipes');
	} else {
		let products = [];
		docs.forEach((doc) => {
			let product = doc.data();
			product.id = doc.id;
			products.push(product);
		});
		res.json(products);
	}
};

export const postRecipe = async (req, res) => {
	const body = req.body;
	if (validRecipeBody(body)) {
		try {
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
		res.status(400).send('Invalid recipe schema!');
	}
};
