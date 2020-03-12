let express = require('express')
let mongoose = require('mongoose')

let auth = require('./routes/auth')

let app = express()


app.get('/', function(req, res){
    res.send('Home page')
})

//use Routes
app.use('/auth', auth)

let port = process.env.PORT || 3000

app.listen(port, function(){
    console.log('app is runing at port 3000....')
})



