import admin from '../firebase/config';
import { validRecipePostBody } from '../utils/schema';

const db = admin.firestore();

export const getRecipe = async (req, res) => {
	const recipeId = req.params.recipeId.trim();
	const doc = await db.collection('recipes').doc(recipeId).get();
	if (!doc.exists) {
		res.send('No such document!');
	} else {
		let data = doc.data();
		data.id = doc.id;
		res.json(data);
	}
};

export const getAllRecipes = async (req, res) => {
	const docs = await db.collection('recipes').get();
	if (docs.empty) {
		res.send('No recipes!');
	} else {
		const recipes = [];
		docs.forEach((doc) => {
			let data = doc.data();
			data.id = doc.id;
			recipes.push(data);
		});
		res.json(recipes);
	}
};

export const postRecipe = async (req, res) => {
	const date = new Date();
	const body = req.body;
	if (validRecipePostBody(body)) {
		try {
			const docRef = await db
				.collection('recipes')
				.add({
					description: body.description,
					instruction: body.instruction,
					ingredients: body.ingredients,
					instruction: body.instruction,
					title: body.title,
					rating: 'undefined',
					created: `${date.getUTCFullYear()}-${date.getMonth()}-${date.getDate()}`,
					categories: body.categories,
					userId: body.userId,
				});
			const doc = await docRef.get();
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

export const deleteRecipe = async (req, res) => {
	const recipeId = req.params.recipeId.trim();
	const result = await db.collection('recipes').doc(recipeId).delete();
	const doc = await db.collection('recipe').doc(recipeId).get();
	if (!doc.exists) {
		res.send('Document deleted!');
	} else {
		res.send('Error deleting!');
	}
};