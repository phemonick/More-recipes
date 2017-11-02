'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var check = exports.check = function check(name, username, email, password, surname) {
  var strPattern = /^\S{3,}@\S{2,}\.\S{2,}$/;
  var message = '';
  if (!name) {
    return {
      message: 'input valid name'
    };
  }
  if (name.includes(' ')) {
    return {
      message: 'input valid name'
    };
  }
  if (!surname || surname.includes(' ')) {
    return {
      message: 'input valid surname'
    };
  }
  if (!username || username.includes(' ')) {
    return {
      message: 'input valid username'
    };
  }
  if (!email || !strPattern.test(email) || email.includes(' ')) {
    return {
      message: 'input valid email'
    };
  }
  if (!password || password.trim().length === 0 || password.length < 5) {
    return {
      message: 'Password must be at least 5 characters'
    };
  }
  return message;
};

var validateUserId = exports.validateUserId = function validateUserId(userId) {
  if (isNaN(userId)) {
    return 'Invalid User ID!';
  }

  return false;
};