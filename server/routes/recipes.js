import express from 'express';
import {RecipeCrude} from '../controllers';


const router = express.Router();

router.get('/api/recipes', RecipeCrude.readRecipes);
router.post('/api/recipes', RecipeCrude.createRecipe);
router.delete('/api/recipes/:id', RecipeCrude.deleteRecipe)
router.put('/api/recipes/:recipeId', RecipeCrude.updateRecipe);

export default router;