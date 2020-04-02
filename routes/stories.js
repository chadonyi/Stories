let express = require('express')
let router = express.Router()

router.get('/', (req, res)=>{
    res.render('stories/index')
})

router.get('/add', (req, res)=>{
    res.render('stories/add')
})


module.exports = router