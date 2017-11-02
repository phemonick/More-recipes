'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _controllers = require('../controllers');

var _auth = require('../middleware/auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var recipeRouter = _express2.default.Router();

recipeRouter.post('/api/v1/recipes', _auth2.default.verifyToken, _controllers.RecipeController.createRecipe);
recipeRouter.delete('/api/v1/recipes/:recipeId', _auth2.default.verifyToken, _controllers.RecipeController.deleteRecipes);
recipeRouter.put('/api/v1/recipes/:recipeId', _auth2.default.verifyToken, _controllers.RecipeController.updateRecipe);
recipeRouter.get('/api/v1/:recipeId', _auth2.default.verifyToken, _controllers.RecipeController.getRecipe);
recipeRouter.get('/api/v1/recipes', _auth2.default.verifyToken, _controllers.RecipeController.getAllRecipe);
recipeRouter.post('/api/v1/recipes/recipeId/reviews', _auth2.default.verifyToken, _controllers.Review.postReview);
recipeRouter.put('/api/:recipeId/upvote', _auth2.default.verifyToken, _controllers.Vote.upvote);
recipeRouter.put('/api/:recipeId/downvote', _auth2.default.verifyToken, _controllers.Vote.downvote);
recipeRouter.get('/api/v1/:recipeId/highestVote', _auth2.default.verifyToken, _controllers.Vote.highestVote);

exports.default = recipeRouter;