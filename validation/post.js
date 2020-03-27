const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : '';

  if (!Validator.isURL(data.text)) {
    errors.text = 'Post must contain media';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};