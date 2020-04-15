const express = require('express');
const User_action = require('../models/user_action')
const router = express.Router();

router.get('/analytics', (req, res) => {

    let token = req.query.token
    let field = req.query.field

    if(!(token || field) ) {
        User_action.find()
            .then(action => {
                if (action.length) {
                    let tokenArr = sortArr(action, 'token')
                    res.render('analytic', {action, tokenArr})

                }
            })
    } else if (field) {
        User_action.find({ 'field': field })
            .then(action => {
                if (action.length) {
                    let tokenArr = sortArr(action, 'token')
                    res.render('analytic', {action, tokenArr})
                }
            })
    } else if(token){
        User_action.find({ 'token': token })
            .then(action => {
                if (action.length) {
                    let tokenArr = sortArr(action, 'token')
                    res.render('analytic', {action, tokenArr})
                }
            })
    }
})

function sortArr (arr, key) {
    let sortArr = arr.map(el => el[key]).sort((a,b) => {
        if(a>b) return 1
        if(a<b) return -1
        if(a===b) return 0
    })

    let newSortArr = [sortArr[0]]
    sortArr.reduce((acc, el) => {
        if (acc !== el) {
            newSortArr.push(el)
        }
        return el
    })
    return newSortArr
}

module.exports = router;