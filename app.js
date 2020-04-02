let express = require('express')
let exphbs = require('express-handlebars')
let mongoose = require('mongoose')
let cookieParser = require('cookie-parser')
let session = require('express-session')
let passport = require('passport')
let path = require('path')
//load routes
let index = require('./routes/index')
let auth = require('./routes/auth')
let stories = require('./routes/stories')


let app = express()

//handlebar middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}))

app.set('view engine', 'handlebars')

//load user model
require('./models/User')

//passport config
require('./config/passport')(passport)

// cookie parser middleware
app.use(cookieParser())
//session middleware
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))

//passport middleware
app.use(passport.initialize())
app.use(passport.session())

//set global variable
app.use((req, res, next) => {
    res.locals.user = req.user || null
    next()
})
//set static folder
app.use(express.static(path.join(__dirname, 'public')))

//use Routes
app.use('/', index)
app.use('/auth', auth)
app.use('/stories', stories)

//load keys
let keys = require('./config/keys')

//mongoose connect
mongoose.connect(keys.mongoURI, {useUnifiedTopology: true})
.then(() => {
    console.log('MongoDB connected...')
}).catch((err) => {
    console.log(err)
})

//map global promise
mongoose.Promise = global.Promise

let port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('app is listening at port 3000....')
})



