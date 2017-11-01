import models from '../models';

const vote = models.Vote;
const recipe = models.Recipes;

class Vote {

  static upvote(req, res) {
    const userId = req.user.id;
    const recipeId = req.params.recipeId;
    vote
      .findOrCreate({
        where: { userId, recipeId },
        defaults: { option: true },
      })
      // spread firs input is the object, and boolean value
      .spread((createdVote, created) => {
        console.log(createdVote);
        if (created) {
          recipe
            .findOne({
              where: {
                id: req.params.id,
              },
            }).then((result) => {
              console.log(`result: ${result} `);
              result.increment('upVote').then(() => {
                result.reload().then(() => res.status(200).send({
                  message: 'upvoted recipe',
                  result,
                  upvote: recipe.upVote,
                  downvote: recipe.downVote,
                }));
              });
            });

        } else if (!created && createdVote.option === false) {
          created.update({ option: true });
          return recipe
            .findOne({ where: { id: req.params.recipeId } })
            .then((recipe) => {
              recipe.increment('upVote').then(() => {
                recipe.decrement('downVote').then(() => {
                  recipe.reload();
                }).then(() => res.status(200).send({
                  status: 'success',
                  message: 'Your vote has been recorded',
                  upvote: recipe.upVote,
                  downvote: recipe.downVote,
                }));
              });
            });
        } else if (!created && createdVote.option === true) {
          vote.destroy();
          return recipe
            .findOne({ where: { id: req.params.recipeId } })
            .then((recipe) => {
              recipe.decrement('upvote').then(() => {
                recipe.reload();
              }).then(() => res.status(200).send({
                status: 'success',
                message: 'Your vote has been removed',
                upvote: recipe.upVote,
                downvote: recipe.downVote,
              }));
            });
        }
      })
      .catch(error => res.status(400).send(error));

  }
  static downvote(req, res) {
    vote.findOrCreate({
      where: {
        userId: req.decoded.user.id,
        recipeId: req.params.recipeId 
},
      defaults: { option: false },
    })
      .spread((voter, created) => {
      // If created perform downvote action
      // If not created and user has information resolving
      // to an upvote, allow user to downvote and remove user's upvote
        if (created) {
          return recipe
            .findOne({ where: { id: req.params.recipeId } })
            .then((result) => {
              result.increment('downvote').then(() => {
                result.reload().then(() => res.status(200).send({
                  status: 'success',
                  message: 'Your vote has been recorded',
                  upvote: recipe.upVote,
                  downvote: recipe.downVote,
                }));
              });
            });
        } else if (!created && voter.option === true) {
          voter.update({ option: false });
          return recipe
            .findOne({ where: { id: req.params.recipeId } })
            .then((result) => {
              result.increment('downVote').then(() => {
                result.decrement('upVote').then(() => {
                  result.reload();
                }).then(() => res.status(200).send({
                  status: 'success',
                  message: 'Your vote has been recorded',
                  upvote: recipe.upVote,
                  downvote: recipe.downVote,
                }));
              });
            });
        } else if (!created && voter.option === false) {
          vote.destroy();
          return recipe
            .findOne({ where: { id: req.params.recipeId } })
            .then((result) => {
              result.decrement('downvote').then(() => {
                result.reload();
              }).then(() => res.status(200).send({
                status: 'success',
                message: 'Your vote has been removed',
                upvote: recipe.upVote,
                downvote: recipe.downVote,
              }));
            });
        }
      })
      .catch(error => res.status(400).send(error));
  }
}
export default Vote;


