let mongoose = require('mongoose')

let Schema = mongoose.Schema

//Create Schema

let UserSchema = new Schema({
    googleID: {
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    firstName:{
        type: String
    },
    lastName:{
        type: String
    },
    image:{
        type: String
    }
})

//create collection and add schema
mongoose.model('users', UserSchema)