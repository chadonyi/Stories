let express = require('express')
let mongoose = require('mongoose')

const app = express()

app.get('/', function(req, res){
    res.send('Home page')
})

let port = process.env.PORT || 3000

app.listen(port, function(){
    console.log('app is runing at port 3000....')
})



