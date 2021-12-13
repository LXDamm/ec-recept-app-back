import admin from '../firebase/config';
import { validRecipePostBody, validRecipeDeleteBody } from '../utils/schema';

const auth = admin.auth();
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
        const token = await auth.verifyIdToken(body.token);
        if (token) {
            const uid = token.uid;
            try {
                const docRef = await db.collection('recipes').add({
                    description: body.description,
                    instructions: body.instructions,
                    ingredients: body.ingredients,
                    title: body.title,
                    rating: 'undefined',
                    created: `${date.getUTCFullYear()}-${date.getMonth()}-${date.getDate()}`,
                    categories: body.categories,
                    userId: uid,
                });
                const doc = await docRef.get();
                const recipeId = doc.id;
                if (!doc.exists) {
                    res.send('Could not create document!');
                } else {
                    res.status(201).json({
                        recipeId: recipeId,
                    });
                }
            } catch (error) {
                console.log(error);
                res.status(409).send(error);
            }
        } else {
            res.status(401).send('Not authorised');
        }
    } else {
        res.status(400).send('Invalid schema');
    }
};

// Needs refactoring
export const deleteRecipe = async (req, res) => {
    const recipeId = req.params.recipeId.trim();
    const body = req.body;
    if (validRecipeDeleteBody(body)) {
        const token = await auth.verifyIdToken(body.token);
        if (token) {
            let doc = await db.collection('recipes').doc(recipeId).get();
            if (doc.exists) {
                const data = doc.data();
                const userId = data.userId;
                if ((token.uid = userId)) {
                    const result = await db
                        .collection('recipes')
                        .doc(recipeId)
                        .delete();
                    doc = await db.collection('recipes').doc(recipeId).get();
                    if (!doc.exists) {
                        res.send('Document deleted!');
                    } else {
                        res.send('(3) Error deleting!');
                    }
                } else {
                    res.status(400).send('UserId does not match');
                }
            } else {
                res.status(400).send('(1) Error deleting!');
            }
        } else {
            res.status(401).send('Not authorized');
        }
    } else {
        res.status(400).send('Invalid schema');
    }
};

export const getRecipesByUser = async (req, res) => {
    const userId = req.params.userId.trim();
    const docs = await db.collection('recipes').where("userId", "==", userId).get();
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