import models from '../models';
import * as validates from '../middleware/validate';

const review = models.Review;
const recipes = models.Recipes;

class Review {
  static postReview(req, res) {
    const userId = req.user.id;
    const { recipeId } = req.params;
    const { content } = req.body;

    const validate = validates.validateUserId;

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
