const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
  let errors = {};

  data.contents = !isEmpty(data.contents) ? data.contents : '';

  if (!Validator.isURL(data.contents[0].content)) {
    errors.content = 'Post must contain media';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};