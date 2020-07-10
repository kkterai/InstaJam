const express = require('express');
const router = express.Router();
const passport = require('passport');

// Profile model
const Profile = require('../../models/Profile');

// Load Validation
const validateProfileInput = require('../../validation/profile');

// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log(req.body)
    const { errors, isValid } = validateProfileInput(req.body);
    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    
    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.username) profileFields.username = req.body.username;
    if (req.body.phone) profileFields.phone = req.body.phone;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.name) profileFields.name = req.body.name;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.email) profileFields.email = req.body.email;
    
    Profile.findOne({ user: req.user.id })
    .then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // Create

        // Check if username exists
        Profile.findOne({ username: profileFields.username })
        .then(profile => {
          if (profile) {
            errors.username = 'That username already exists';
            res.status(400).json(errors);
          }
         // Save Profile
         new Profile(profileFields)
         .save()
         .then(profile => res.json(profile));
        });
      }
    });
  }
);

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    debugger;
    Profile.findOne({user: req.user.id})
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        if (!profile){
          errors.noprofile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }
        console.log(profile)
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
)

// @route   GET api/profile/username/:username
// @desc    Get profile by username
// @access  Public

router.get('/username/:username', (req, res) => {
  const errors = {};

  Profile.findOne({ username: req.params.username })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get('/all', (req, res) => {
  const errors = {};

  Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = 'There are no profiles';
        return res.status(404).json(errors);
      }

      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: 'There are no profiles' }));
});

module.exports = router;