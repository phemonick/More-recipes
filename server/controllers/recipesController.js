import recipe from '../models/recipe'
let recipes=recipe.recipes;

class RecipeCrude{

   static	createRecipe(req,res){

			recipes.push({
			title:req.body.title,
			id:recipes.recipes.length,
			main_characters: req.body.main_characters,
			poster:req.body.poster,
			hero_image: req.body.hero_image,
	})
	res.status(200).send(recipes.recipes);

	}

	static readRecipes(req,res){
		res.status(200).json(recipes);
	}

	static deleteRecipe(req,res){
		const value = req.params.id;
		recipes.map((recipe) => {
			if(recipe.id == value){
				recipes.splice(recipe,1)
			}
		})
		res.status(200).json(recipes)
	}
	static updateRecipe(req,res){
		const value = req.params.id;
		recipes.map((recipe) => {
			if(recipe.id == value){
				console.log(value)
			}
		})
		res.status(201).send('user updated');
	}
	static findRecipe(req,res){
		res.status(201).send('user found');
	}

}
export default RecipeCrude;