'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _recipes = require('./recipes');

var _recipes2 = _interopRequireDefault(_recipes);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  userRouter: _user2.default,
  recipeRouter: _recipes2.default
};