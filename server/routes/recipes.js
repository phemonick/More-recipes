import express from 'express';
import { RecipeController, Review, Favorite, Vote } from '../controllers';
import Auth from '../middleware/auth';

const recipeRouter = express.Router();

recipeRouter.post('/api/v1/recipes', Auth.verifyToken, RecipeController.createRecipe);
recipeRouter.delete('/api/v1/recipes/:recipeId', Auth.verifyToken, RecipeController.deleteRecipes);
recipeRouter.put('/api/v1/recipes/:recipeId', Auth.verifyToken, RecipeController.updateRecipe);
recipeRouter.get('/api/v1/:recipeId', Auth.verifyToken, RecipeController.getRecipe);
recipeRouter.get('/api/v1/recipes', Auth.verifyToken, RecipeController.getAllRecipe);
recipeRouter.post('/api/v1/recipes/recipeId/reviews', Auth.verifyToken, Review.postReview);
recipeRouter.put('/api/:recipeId/upvote', Auth.verifyToken, Vote.upvote);
recipeRouter.put('/api/:recipeId/downvote', Auth.verifyToken, Vote.downvote);
recipeRouter.get('/api/v1/:recipeId/highestVote', Auth.verifyToken, Vote.highestVote);

export default recipeRouter;
