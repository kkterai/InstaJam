const express = require('express');
const router = express.Router();
const gravatar = require("gravatar");

// User model
const User = require('../../models/User');

// TODO: Validation

router.get("/test", (req,res) => 
    res.json({
        msg: 'User api works!'
    })
);

// @route   POST api/users/register
// @desc    Register user
// @access  public
router.post("/register", (req, res) => {
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
          })
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err));;
        }
    })
  });

module.exports = router;