import express from 'express';
import {
    getAllRecipes,
    getRecipe,
    postRecipe,
    deleteRecipe,
    getRecipesByUser
} from '../controllers/recipe';

const router = express.Router();

router.post('/', postRecipe);
router.get('/', getAllRecipes);
router.get('/:recipeId', getRecipe);
router.get('/user/:userId', getRecipesByUser);
router.delete('/:recipeId', deleteRecipe);

export default router;
