let express = require('express')
let router = express.Router()

router.get('/google', function(req, res){
    res.send('auth')
})

module.exports = router