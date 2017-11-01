import express from 'express';
import {RecipeCrude, Review, Favorite} from '../controllers';
import Auth from '../middleware/auth'


 const recipeRouter = express.Router();

recipeRouter.get('/api/v1/recipes', (req, res) => {
    res.send('am working');
});
recipeRouter.post('/api/v1/recipes', RecipeCrude.createRecipe);
recipeRouter.delete('/api/v1/recipes/:recipeId', RecipeCrude.deleteRecipes);
recipeRouter.put('/api/v1/recipes/:recipeId', RecipeCrude.updateRecipe);
recipeRouter.get('/api/v1/:recipeId',RecipeCrude.getRecipe);
recipeRouter.get('/api/v1/recipes', RecipeCrude.getAllRecipe);
recipeRouter.post('/api/v1/recipes/recipeId/reviews', Review.postReview);
recipeRouter.get('/api/users/<userId>/recipes', Favorite.getFavorite);

export default recipeRouter;