import express from 'express';
import { getAllRecipes, getRecipe, postRecipe } from '../controllers/recipe';

const router = express.Router();

router.post('/', postRecipe);
router.get('/', getAllRecipes);
router.get('/:recipeId', getRecipe);

export default router;