import recipe from '../models/recipe'
let recipes=recipe.recipes;

class RecipeCrude{

   static	createRecipe(req,res){
	   recipes.push({
		   "name": req.body.name,
		   "id": req.body.id,
		   "recipe_details": req.body.recipe_details,

	   })

	res.status(200).send(recipes);

	}

	static readRecipes(req,res){
		res.status(200).json(recipes);
	}

	static deleteRecipe(req,res){
		const value = req.params.id;
		// recipes.map((recipe) => {
		// 	if(recipe.id == value){
		// 		let arr = indexOf(recipe);
		// 		recipes.splice(arr,1);
		// 	}
		// })
		for(let key=0; key<recipes.length; key++){
			if(recipes[key].id === value){
				recipes.splice(key,1);
			}
		}
		res.status(200).json(recipes)
	}
	static updateRecipe(req,res){
		const value = req.params.recipeId;
		recipes.map((recipe) => {
			if(recipe.id == value){
				recipe.name=req.body.name;
				recipe.recipe_details=req.body.recipe_details;
				recipe.id=req.body.id;
			}
		})
		res.status(201).send(recipes);
	}
	static findRecipe(req,res){
		res.status(201).send('user found');
	}
	static postReviews(req,res){
		const value = req.params.recipeId;
		recipes.map((recipe) => {
			if(recipe.id == value){
				recipe.reviews=req.body.reviews;
			}
		})
		res.status(201).send(recipes);
	}
	static highVote(req,res){
		let max=0;
		let display= {};
		recipes.map((recipe) => {
			if((recipe.vote.upvote) > (max)){

				max = recipe.vote.upvote;
				display=recipe;
			}

		})
		res.status(201).json(display);
	}

}
export default RecipeCrude;