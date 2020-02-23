const express = require('express');
const router = express.Router();

// Dashboard model
const Dashboard = require('../../models/Dashboard');

// TODO: Validation

router.get("/test", (req,res) => 
    res.json({
        msg: 'Dashboard api works!'
    })
);

module.exports = router;