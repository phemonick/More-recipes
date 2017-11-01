import models from '../models';
import * as validate from '../middleware/validate';

const favorite = models.Favorite;
const recipes = models.Recipes;

class Favorite {

    static getFavorite(req, res) {
        const userId = req.params.userId;

        favorite.findAll({
            where: {userId},
            include: [
                {model: models.Recipes}
            ]
        })
        .then((result) => {
            if(!result) {
                return res.status(401).send('no favorites yet')
            }
            return res.status(200).send(result)
        })
        .catch((err) => {
            return res.status(500).send(err)
        })
    }
}
export default Favorite;