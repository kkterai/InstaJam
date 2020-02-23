const express = require('express');
const router = express.Router();

// Profile model
const Profile = require('../../models/Profile');

// TODO: Validation

router.get("/test", (req,res) => 
    res.json({
        msg: 'Profile api works!'
    })
);

module.exports = router;