import express from 'express';
import {RecipeCrude} from '../controllers';
import Auth from '../middleware/auth'


 const recipeRouter = express.Router();

recipeRouter.get('/api/v1/recipes', (req, res) => {
    res.send('am working');
});
recipeRouter.post('/api/v1/recipes', RecipeCrude.createRecipe);
recipeRouter.delete('/api/v1/recipes/:recipeId', RecipeCrude.deleteRecipes);
recipeRouter.put('/api/v1/recipes/:recipeId', RecipeCrude.updateRecipe);
recipeRouter.get('/api/v1/:userId/recipes',RecipeCrude.getRecipes);
// router.get('/api/v1/recipes/vote', RecipeCrude.highVote);

export default recipeRouter;