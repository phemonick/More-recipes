import express from 'express';
import {RecipeCrude} from '../controllers';
import Auth from '../middleware/auth'


 const recipeRouter = express.Router();

recipeRouter.get('/api/v1/recipes', (req, res) => {
    res.send('am working');
});
recipeRouter.post('/api/v1/recipes', RecipeCrude.createRecipe);
// router.delete('/api/v1/recipes/:id', RecipeCrude.deleteRecipe)
router.put('/api/v1/recipes/:recipeId', RecipeCrude.updateRecipe);
// router.post('/api/v1/recipes/:recipeId/reviews',RecipeCrude.postReviews)
// router.get('/api/v1/recipes/vote', RecipeCrude.highVote);

export default recipeRouter;