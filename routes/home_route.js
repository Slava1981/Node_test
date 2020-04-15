const express = require('express');
const moment = require('moment');
const User_action = require('../models/user_action')
const router = express.Router();

router.get('/home', (req, res) => {
    if (!req.cookies.token) {
        let random = Math.floor(Math.random() * 1000000) + req.cookies.io
        res.cookie('token', random)
    }
    res.render('home')
})


router.get('/', (req, res) => {
    if (!req.cookies.token) {
        let random = Math.floor(Math.random() * 1000000) + req.cookies.io
        res.cookie('token', random)
    }
    res.redirect("/home")
})


router.post('/save', function (req, res) {
    const token = req.cookies.token;
    const field = req.body.field;
    const date = moment().format("DD.MM.YYYY");
    const fields = [token, field, date];
    console.log(fields);
    const newUser_action = new User_action({
        token,
        field,
        date,
    })
    newUser_action.save()
        .then(result => res.json(console.log(result)))
        .catch(err => console.log(err))
})

module.exports = router;