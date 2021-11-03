
const router = require('express').Router();
let User = require('../models/usermodels');
const express = require('express');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});

var app = express();

app.post()

router.route('/').get((req,res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const pantherId = Number(req.body.pantherId);
    const firstName= req.body.firstName;
    const lastName= req.body.lastName;
    const department= req.body.department;
    const level= req.body.level;
    const campus= req.body.campus;
    const degree= req.body.degree;
    const email= req.body.email;
    const college= req.body.email
    const year= Number(req.body.pantherId);

    const newUser = new User({
        pantherId,
        firstName,
        lastName ,
        department,
        level,
        campus,
        degree,
        email,
        college,
        year,
    });

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;