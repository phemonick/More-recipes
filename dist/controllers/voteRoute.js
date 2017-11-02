'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var vote = _models2.default.Vote;
var recipe = _models2.default.Recipes;

var Vote = function () {
  function Vote() {
    _classCallCheck(this, Vote);
  }

  _createClass(Vote, null, [{
    key: 'upvote',
    value: function upvote(req, res) {
      var userId = req.user.id;
      var recipeId = req.params.recipeId;

      vote.findOrCreate({
        where: { userId: userId, recipeId: recipeId },
        defaults: { options: true }
      })
      // spread firs input is the object, and boolean value
      .spread(function (createdVote, created) {
        // console.log(createdVote);
        if (created) {
          recipe.findOne({
            where: {
              id: req.params.id
            }
          }).then(function (result) {
            console.log('result: ' + result + ' ');
            result.increment('upVote').then(function () {
              result.reload().then(function () {
                return res.status(200).send({
                  message: 'upvoted recipe',
                  result: result,
                  upvote: recipe.upVote,
                  downvote: recipe.downVote
                });
              });
            });
          });
        } else if (!created && createdVote.options === false) {
          created.update({ options: true });
          return recipe.findOne({ where: { id: req.params.recipeId } }).then(function (recipe) {
            recipe.increment('upVote').then(function () {
              recipe.decrement('downVote').then(function () {
                recipe.reload();
              }).then(function () {
                return res.status(200).send({
                  status: 'success',
                  message: 'Your vote has been recorded',
                  upvote: recipe.upVote,
                  downvote: recipe.downVote
                });
              });
            });
          });
        } else if (!created && createdVote.options === true) {
          vote.destroy();
          return recipe.findOne({ where: { id: req.params.recipeId } }).then(function (recipe) {
            recipe.decrement('upvote').then(function () {
              recipe.reload();
            }).then(function () {
              return res.status(200).send({
                status: 'success',
                message: 'Your vote has been removed',
                upvote: recipe.upVote,
                downvote: recipe.downVote
              });
            });
          });
        }
      }).catch(function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: 'downvote',
    value: function downvote(req, res) {
      vote.findOrCreate({
        where: {
          userId: req.user.id,
          recipeId: req.params.recipeId
        },
        defaults: { options: false }
      }).spread(function (voter, created) {
        // If created perform downvote action
        // If not created and user has information resolving
        // to an upvote, allow user to downvote and remove user's upvote
        if (created) {
          return recipe.findOne({ where: { id: req.params.recipeId } }).then(function (result) {
            result.increment('downvote').then(function () {
              result.reload().then(function () {
                return res.status(200).send({
                  status: 'success',
                  message: 'Your vote has been recorded',
                  upvote: recipe.upVote,
                  downvote: recipe.downVote
                });
              });
            });
          });
        } else if (!created && voter.options === true) {
          voter.update({ options: false });
          return recipe.findOne({ where: { id: req.params.recipeId } }).then(function (result) {
            result.increment('downVote').then(function () {
              result.decrement('upVote').then(function () {
                result.reload();
              }).then(function () {
                return res.status(200).send({
                  status: 'success',
                  message: 'Your vote has been recorded',
                  upvote: recipe.upVote,
                  downvote: recipe.downVote
                });
              });
            });
          });
        } else if (!created && voter.options === false) {
          vote.destroy();
          return recipe.findOne({ where: { id: req.params.recipeId } }).then(function (result) {
            result.decrement('downvote').then(function () {
              result.reload();
            }).then(function () {
              return res.status(200).send({
                status: 'success',
                message: 'Your vote has been removed',
                upvote: recipe.upVote,
                downvote: recipe.downVote
              });
            });
          });
        }
      }).catch(function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: 'highestVote',
    value: function highestVote(req, res) {}
  }]);

  return Vote;
}();

exports.default = Vote;