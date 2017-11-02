'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _validate = require('../middleware/validate');

var validate = _interopRequireWildcard(_validate);

var _auth = require('../middleware/auth');

var _auth2 = _interopRequireDefault(_auth);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var recipes = _models2.default.Recipes;

var RecipeController = function () {
  function RecipeController() {
    _classCallCheck(this, RecipeController);
  }

  _createClass(RecipeController, null, [{
    key: 'getAllRecipe',
    value: function getAllRecipe(req, res) {
      recipes.findAll().then(function (allRecipes) {
        if (!allRecipes) {
          return res.status(404).send('no recipes found');
        }
        return res.status(200).send(allRecipes);
      });
    }
  }, {
    key: 'createRecipe',
    value: function createRecipe(req, res) {
      var _req$body = req.body,
          name = _req$body.name,
          description = _req$body.description,
          ingredients = _req$body.ingredients,
          viewCount = _req$body.viewCount;

      if (!req.user.id) {
        return res.status(404).send('no user token');
      }
      recipes.create({
        name: name,
        description: description,
        ingredients: ingredients,
        viewCount: viewCount,
        userId: req.user.id
      }).then(function (recipe) {
        res.status(200).send(recipe);
      }).catch(function (err) {
        return res.status(500).send(err);
      });
      return this;
    }
  }, {
    key: 'getRecipe',
    value: function getRecipe(req, res) {
      var recipeId = req.params.recipeId;

      recipes.findById(req.params.recipeId, {
        include: [{ model: _models2.default.User, attributes: ['id']
        }]
      }).then(function (recipe) {
        if (!recipe) {
          return res.status(404).json({
            message: ' recipe not found'
          });
        }
        res.status(200).json({ recipe: recipe });
      }).catch(function (err) {
        return res.status(500).json({
          message: 'Unable to fetch recipes',
          error: err
        });
      });

      return this;
    }
  }, {
    key: 'updateRecipe',
    value: function updateRecipe(req, res) {
      var userId = req.user.id;
      var id = req.params.recipeId;
      var _req$body2 = req.body,
          description = _req$body2.description,
          ingredients = _req$body2.ingredients,
          name = _req$body2.name,
          direction = _req$body2.direction;


      recipes.findById(id).then(function (recipe) {
        if (!recipe) {
          return res.status(404).send('no recipe with given id');
        }
        if (recipe.userId !== userId) {
          return res.status(401).send('you cant modify a recipe u didnt create');
        }

        recipes.update({
          name: name,
          description: description,
          ingredients: ingredients,
          direction: direction
        }, {
          where: {
            id: id
          }
        }).then(function (recipe) {
          res.status(200).json({
            message: 'success',
            result: recipe
          });
        });
      }).catch(function (err) {
        res.status(401).send(err);
      });
    }
  }, {
    key: 'deleteRecipes',
    value: function deleteRecipes(req, res) {
      var recipeId = req.params.recipeId;
      var userId = req.user.id;

      recipes.findById(recipeId).then(function (recipe) {
        if (!recipe) {
          return res.status(404).send('no recipe for the specified ID');
        }
        if (recipe.userId !== userId) {
          return res.status(401).send('you cant delete a recipe u didnt create');
        }
      });
      recipes.destroy({
        where: {
          id: recipeId
        }
      }).then(function (recipe) {
        res.status(200).json({
          message: 'recipe deleted',
          result: recipe
        });
      }).catch(function (err) {
        return res.status(500).send(err);
      });
    }
  }]);

  return RecipeController;
}();

exports.default = RecipeController;