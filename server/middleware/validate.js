export const check = (name, username, email, password, surname) => {
  const strPattern = /^\S{3,}@\S{2,}\.\S{2,}$/;
  const message = '';
  if (!name) {
    return ({
      message: 'input valid name',
    });
  }
  if (name.includes(' ') ) {
    return ({
      message: 'input valid name',
    });
  }
  if (!surname || surname.includes(' ')) {
    return ({
      message: 'input valid surname',
    });
  }
  if (!username || username.includes(' ')) {
    return ({
      message: 'input valid username',
    });
  }
  if ((!email) || !strPattern.test(email) || (email.includes(' '))) {
    return ({
      message: 'input valid email',
    });
  }
  if (!password || password.trim().length === 0 || password.length < 5) {
    return ({
      message: 'Password must be at least 5 characters',
    });
  }
  return message;
};

export const validateUserId = (userId) => {
  if (isNaN(userId)) {
    return 'Invalid User ID!';
  }

  return false;
};


