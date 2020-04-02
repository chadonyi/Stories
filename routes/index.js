let express = require('express')
let router = express.Router()
let {ensureAuthenticated, ensureGuest} = require('../helpers/auth')

router.get('/', ensureGuest, (req, res) => {
    res.render('index/welcome')
})

router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('index/dashboard')
})



module.exports = router