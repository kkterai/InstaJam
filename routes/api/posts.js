const express = require('express');
const router = express.Router();

// Post model
const Post = require('../../models/Post');

// TODO: Validation

router.get("/test", (req,res) => 
    res.json({
        msg: 'Posts api works!'
    })
);

module.exports = router;