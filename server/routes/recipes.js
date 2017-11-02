import express from 'express';
import { RecipeCrude, Review, Favorite, Vote } from '../controllers';
import Auth from '../middleware/auth';

const recipeRouter = express.Router();

recipeRouter.post('/api/v1/recipes', Auth.verifyToken, RecipeCrude.createRecipe);
recipeRouter.delete('/api/v1/recipes/:recipeId', Auth.verifyToken, RecipeCrude.deleteRecipes);
recipeRouter.put('/api/v1/recipes/:recipeId', Auth.verifyToken, RecipeCrude.updateRecipe);
recipeRouter.get('/api/v1/:recipeId', Auth.verifyToken, RecipeCrude.getRecipe);
recipeRouter.get('/api/v1/recipes', Auth.verifyToken, RecipeCrude.getAllRecipe);
recipeRouter.post('/api/v1/recipes/recipeId/reviews', Auth.verifyToken, Review.postReview);
recipeRouter.post('/api/v1/users/:userId/recipes', Auth.verifyToken, Favorite.addFavorite)
recipeRouter.get('/api/v1/users/:userId/recipes', Auth.verifyToken, Favorite.getFavorite);
recipeRouter.put('/api/:recipeId/upvote', Auth.verifyToken, Vote.upvote);
recipeRouter.put('/api/:recipeId/downvote', Auth.verifyToken, Vote.downvote);

export default recipeRouter;
