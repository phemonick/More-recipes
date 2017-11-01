import models from '../models';
import * as validate from '../middleware/validate';

const review = models.Review;
const recipes = models.recipes;

class Review {

  static postReview(req, res) {
        const userId = req.user.id;
        const recipeId = req.params.recipeId;
        const content = req.body.content 

        review.create({
                userId,
                recipeId,
                content     
        })
        .then((userReview) => {
            return res.status(200).send(userReview);
        })
        .catch((err) => {
            return res.status(500).json({
                message: err
            })
        })
    }
}
export default Review;