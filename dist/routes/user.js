'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _controllers = require('../controllers');

var _auth = require('../middleware/auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userRouter = _express2.default.Router();

userRouter.get('/api/v1/users', _controllers.UserController.getUser);
userRouter.post('/api/v1/users/signup', _controllers.UserController.createUser);
userRouter.post('/api/v1/users/signin', _controllers.UserController.signIn);
userRouter.post('/api/v1/users/:userId/recipes', _auth2.default.verifyToken, _controllers.Favorite.addFavorite);
userRouter.get('/api/v1/users/:userId/recipes', _auth2.default.verifyToken, _controllers.Favorite.getFavorite);

exports.default = userRouter;