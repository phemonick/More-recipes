'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _validate = require('../middleware/validate');

var validates = _interopRequireWildcard(_validate);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var review = _models2.default.Review;
var recipes = _models2.default.Recipes;

var Review = function () {
  function Review() {
    _classCallCheck(this, Review);
  }

  _createClass(Review, null, [{
    key: 'postReview',
    value: function postReview(req, res) {
      var userId = req.user.id;
      var recipeId = req.params.recipeId;
      var content = req.body.content;


      var validate = validates.validateUserId;

      review.create({
        userId: userId,
        recipeId: recipeId,
        content: content
      }).then(function (userReview) {
        res.status(200).send(userReview);
      }).catch(function (err) {
        return res.status(500).json({
          message: err
        });
      });
    }
  }]);

  return Review;
}();

exports.default = Review;