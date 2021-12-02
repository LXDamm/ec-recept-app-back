import admin from '../firebase/config';
import { validRecipeBody } from '../utils/schema';

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
		res.send('No recipes!');
	} else {
		const recipes = [];
		docs.forEach((doc) => {
			recipes.push(doc.data());
		});
		res.json(recipes);
	}
};

export const postRecipe = async (req, res) => {
	const body = req.body;
	if (validRecipeBody(body)) {
		try {
			const docRef = await db
				.collection('recipes')
				.add({
					description: body.description,
					ingredients: body.ingredients,
					title: body.title,
					rating: body.rating,
					created: 'undefined',
					categories: body.categories,
					userId: body.userId
				});
			const doc = await docRef.get();
			console.log(doc.id);
			const recipeId = doc.id;
			if (!doc.exists) {
				res.send('Could not create document!');
			} else {
				res.status(201).json({ recipeId: recipeId});
			}
		} catch (error) {
			console.log(error);
			res.status(409).send(error);
		}
	} else {
		res.status(400).send('Invalid recipe schema!');
	}
};
