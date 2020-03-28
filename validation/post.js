const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
  let errors = {};

  data.content = !isEmpty(data.content) ? data.content : '';

  if (!Validator.isURL(data.content)) {
    errors.content = 'Post must contain media';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};