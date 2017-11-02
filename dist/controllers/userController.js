'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _validate = require('../middleware/validate');

var validate = _interopRequireWildcard(_validate);

var _auth = require('../middleware/auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var users = _models2.default.User;

var UserController = function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, null, [{
    key: 'createUser',
    // crude operatuons
    value: function createUser(req, res) {
      var name = req.body.name;
      var username = req.body.username;
      var password = req.body.password;
      var email = req.body.email;
      var surname = req.body.surname;

      var validCheck = validate.check(name, username, email, password, surname);
      if (validCheck !== '') {
        return res.status(400).send({
          message: validCheck
        });
      }
      // Returns one document that satisfies the specified query criteria on the collection
      users.findOne({
        attributes: ['email', 'username'],
        //    projection parameter
        where: {
          $or: [{
            username: {
              $ilike: username
            }
          }, {
            email: {
              $ilike: email
            }
          }]
        }
      }).then(function (userfound) {
        if (userfound.username == username) {
          return res.status(404).send('username taken');
        } else if (userfound.email == email) {
          return res.status(404).send('email already taken');
        }
      });

      var data = req.body.password;
      _bcryptjs2.default.hash(data, 10).then(function (hash) {
        return users.create({
          name: req.body.name,
          username: req.body.username,
          password: hash,
          email: req.body.email,
          surname: req.body.surname
        }).then(function (user) {
          return res.status(201).send(user);
        });
      }).catch(function (error) {
        return res.status(400).send(error);
      });
    }
    // always leave spaces between declarations

  }, {
    key: 'signIn',
    value: function signIn(req, res) {
      var data = req.body.password;

      return users.find({
        where: {
          username: req.body.username
          //   password: req.body.password,
        }
      }).then(function (user) {
        if (!user) {
          return res.status(404).send({
            message: 'username Not Found'
          });
        }
        _bcryptjs2.default.compare(data, user.password).then(function (bool) {
          if (bool) {
            var token = _jsonwebtoken2.default.sign({
              id: user.id
            }, process.env.SECRET, { expiresIn: Math.floor(Date.now() / 1000) + 60 * 60 });
            return res.status(200).send({
              message: 'user log in successful',
              token: token
            });
          }
          return res.status(404).send({
            message: 'password Not or username correct'
          });
        });
      }).catch(function (error) {
        return res.status(400).send(error);
      });
    } // fix your indentation

  }, {
    key: 'getUser',
    value: function getUser(req, res) {
      return users.all().then(function (user) {
        return res.status(201).send(user);
      });
    }
  }]);

  return UserController;
}();

exports.default = UserController;