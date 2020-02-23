const express = require('express');
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

// User model
const User = require('../../models/User');

// Load input validation
const validateRegisterInput = require('../../validation/register');


// @route   POST api/users/register
// @desc    Register user
// @access  public
router.post("/register", (req, res) => {
    const {errors, isValid} =  validateRegisterInput(req.body);
    //Check validation
    if (!isValid){
        return res.status(400).json(errors);
    }
    User.findOne({ email: req.body.email })
      .then(user => {
        if (user) {
            errors.email = "Email already exists";
            return res.status(400).json(errors);
        } else {
          const avatar = gravatar.url(req.body.email, {
            s: "200",
            r: "pg",
            d: "mm"
          });
  
          const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            avatar,
            password: req.body.password
          });

         bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
		})
		.catch(err => console.log(err));
  });

module.exports = router;