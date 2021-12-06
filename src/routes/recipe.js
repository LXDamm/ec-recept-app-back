import express from 'express';
import { getAllRecipes, getRecipe, postRecipe, deleteRecipe } from '../controllers/recipe';

const router = express.Router();

router.post('/', postRecipe);
router.get('/', getAllRecipes);
router.get('/:recipeId', getRecipe);
router.delete('/:recipeId', deleteRecipe);

export default router;