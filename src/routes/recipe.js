import express from 'express';
import { getAllRecipes, getRecipe } from '../controllers/recipe';

const router = express.Router();

router.get('/', getAllRecipes);
router.get('/:recipeId', getRecipe);

export default router;