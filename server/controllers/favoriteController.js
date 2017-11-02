import models from '../models';
// import * as validate from '../middleware/validate' ;
const favorite = models.Favorite;
// const recipes = models.Recipes;

class Favorite {

  static getFavorite(req, res) {
    const { userId } = req.params;

    favorite.findAll({
      where: { userId },
      include: [
        { model: models.Recipes },
      ],
    })
      .then((result) => {
        if (result.length === 0) {
          return res.status(401).send('no favorites yet');
        }
        return res.status(200).send(result);
      })
      .catch(err => res.status(500).send(err));
  }
  static addFavorite(req, res) {
    const userId = req.user.id;
    const recipeId = req.params.recipeId;

    favorite
      .findOrCreate({
        where: { userId, recipeId },
      }).spread((recipes, created) => {
        if (created) {
          return res.status(201).send({
            success: true,
            mesage: `recipe added in id ${recipeId}`,
          });
        }
        return res.status(401).send({
          success: 'true',
          message: 'already fovorite',
        });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  }
}
export default Favorite;
