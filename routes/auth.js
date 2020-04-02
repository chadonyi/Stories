let express = require('express')
let router = express.Router()
let passport = require('passport')


router.get('/google', passport.authenticate('google',
{scope: ['profile', 'email']}))
// ==> what you want to request from user when they authenticate

router.get('/google/callback', 
passport.authenticate('google', {failureRedirect: '/'}),
    (req, res) => {
    res.redirect('/dashboard')
})

router.get('/verify', (req, res) => {
    if(req.user){
        console.log(req.user)
    }else{
        console.log('not Auth')
    }
})

//logout route
router.get('/logout', (req, res) =>{
    req.logout()
    res.redirect('/')
})

module.exports = router