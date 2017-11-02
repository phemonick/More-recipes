import models from '../models';
import bcrypt from 'bcryptjs';
import * as validate from '../middleware/validate';
import Auth from '../middleware/auth';
import jwt from 'jsonwebtoken';

const recipes = models.Recipes;

class RecipeCrude {
  static getAllRecipe(req, res) {
    recipes.findAll()
      .then((allRecipes) => {
        if (!allRecipes) {
          return res.status(404).send('no recipes found');
        }
        return res.status(200).send(allRecipes);

      });
  }
  static createRecipe(req, res) {
    const {
      name, description, ingredients, viewCount,
    } = req.body;
    if (!req.user.id) {
      return res.status(404).send('no user token');
    }
    recipes.create({
      name,
      description,
      ingredients,
      viewCount,
      userId: req.user.id,
    })
      .then((recipe) => {
        res.status(200).send(recipe);
      })
      .catch(err => res.status(500).send(err));
    return this;
  }

  static getRecipe(req, res) {
    const recipeId = req.params.recipeId;

    recipes
      .findById(req.params.recipeId, {
        include: [
          { model: models.User, attributes: ['id'],
          }],
      })
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).json({
            message: ' recipe not found',
          });
        }
        res.status(200).json({ recipe });
      })
      .catch(err => res.status(500).json({
        message: 'Unable to fetch recipes',
        error: err,
      }));

    return this;
  }
  static updateRecipe(req, res) {
    const userId = req.user.id;
    const id = req.params.recipeId;
    const {
      description, ingredients, name, direction,
    } = req.body;

    recipes
      .findById(id)
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send('no recipe with given id');
        }
        if (recipe.userId !== userId) {
          return res.status(401).send('you cant modify a recipe u didnt create');
        }

        recipes
          .update({
            name,
            description,
            ingredients,
            direction,
          }, {
            where: {
              id,
            },
          },
          )
          .then((recipe) => {
            res.status(200).json({
              message: 'success',
              result: recipe,
            });
          });
      })
      .catch((err) => {
        res.status(401).send(err);
      });
  }
  static deleteRecipes(req, res) {
    const recipeId = req.params.recipeId;
    const userId = req.user.id;

    recipes
      .findById(recipeId)
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send('no recipe for the specified ID');
        }
        if (recipe.userId !== userId) {
          return res.status(401).send('you cant delete a recipe u didnt create');
        }
      });
    recipes.destroy({
      where: {
        id: recipeId,
      },
    })
      .then((recipe) => {
        res.status(200).json({
          message: 'recipe deleted',
          result: recipe,
        });
      })
      .catch(err => res.status(500).send(err));
  }
}

export default RecipeCrude;
