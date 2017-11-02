'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import * as validate from '../middleware/validate' ;
var favorite = _models2.default.Favorite;
// const recipes = models.Recipes;

var Favorite = function () {
  function Favorite() {
    _classCallCheck(this, Favorite);
  }

  _createClass(Favorite, null, [{
    key: 'getFavorite',
    value: function getFavorite(req, res) {
      var userId = req.params.userId;


      favorite.findAll({
        where: { userId: userId },
        include: [{ model: _models2.default.Recipes }]
      }).then(function (result) {
        if (result.length === 0) {
          return res.status(401).send('no favorites yet');
        }
        return res.status(200).send(result);
      }).catch(function (err) {
        return res.status(500).send(err);
      });
    }
  }, {
    key: 'addFavorite',
    value: function addFavorite(req, res) {
      var userId = req.user.id;
      var recipeId = req.params.recipeId;

      favorite.findOrCreate({
        where: { userId: userId, recipeId: recipeId }
      }).spread(function (recipes, created) {
        if (created) {
          return res.status(201).send({
            success: true,
            mesage: 'recipe added in id ' + recipeId
          });
        }
        return res.status(401).send({
          success: 'true',
          message: 'already fovorite'
        });
      }).catch(function (err) {
        res.status(500).send(err);
      });
    }
  }]);

  return Favorite;
}();

exports.default = Favorite;