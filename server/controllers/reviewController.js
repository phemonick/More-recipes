import models from '../models';
import * as validate from '../middleware/validate';

const review = models.Review;
const recipes = models.Recipes;

class Review {

  static postReview(req, res) {
    const userId = req.user.id;
    const recipeId = req.params.recipeId;
    const content = req.body.content;

    const validate = validate.validateUserId

    review.create({
      userId,
      recipeId,
      content,
    })
      .then((userReview) => {
        res.status(200).send(userReview);
      })

      .catch(err => res.status(500).json({
        message: err,
      }));

  }
}
export default Review;
