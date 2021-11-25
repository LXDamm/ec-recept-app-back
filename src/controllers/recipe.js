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