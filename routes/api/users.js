const express = require('express');
const router = express.Router();

// User model
const User = require('../../models/User');

// TODO: Validation

router.get("/test", (req,res) => 
    res.json({
        msg: 'User api works!'
    })
);

module.exports = router;