import recipe from '../models';
import bcrypt from 'bcryptjs';
import * as validate from '../middleware/validate'
import Auth from '../middleware/auth'
import jwt from 'jsonwebtoken';

const recipes = recipe.Recipes;

class RecipeCrude {
    static createRecipe(req, res){
        const { name ,description, ingredients, viewCount} = req.body;
        recipes.create({
           name : req.body.name,
           description : req.body.description,
           ingredients : req.body.ingredients,
           viewCount : req.body.viewCount,
           userId: req.id,
        })
        .then((recipe) => {
            res.status(200).send(recipe)
        })
        .catch((err) => res.status(500).send(err))
    }

    static readRecipe(req, res){
        res.send('working');
    }
    static updateRecipe(req, res){
        const userId = req.user.id;
        const id = req.params.id;
        const { description, ingredients, name, direction} = req.body;
        
        recipes
        .findById(id)
        .then((recipe) => {
            if(!recipe){
                return res.status(404).send('no recipe with given id')
            }
            if(recipe.userId !== userId) {
                return res.status(401).send('you cant modify a recipe u didnt create')
            }

            recipes
            .update({
                name,
                description,
                ingredients,
                direction
            },{
                where: {
                    id: id
                }
            }
        )
        .then((recipe) => {
            res.status(200).send(recipe);
        })
        })
        .catch((err) =>{
            res.status(401).send(err)
        })
    }
}

export default RecipeCrude;