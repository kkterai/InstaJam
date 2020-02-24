const Validator = require('validator');
const isEmpty = require('./is-empty');

// WIP - Exploring how to validate images and video rather than text
// For example, it appears to be best to convert images to base64 format - How to incorporate?

module.exports = function validatePostInput(data) {
  let errors = {};

  // data.text = !isEmpty(data.text) ? data.text : '';

  // if (Validator.isEmpty(data.text)) {
  //   errors.text = 'Text field is required';
  // }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};