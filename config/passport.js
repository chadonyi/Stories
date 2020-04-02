let GoogleStrategy = require
('passport-google-oauth20').Strategy
let mongoose = require('mongoose')
let keys = require('./keys')
//load user model
let User = mongoose.model('users')

module.exports = function(passport){
    passport.use(
        new GoogleStrategy({
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
            proxy:true
        }, (accessToken, refreshToken, profile, done) => {
            //console.log(accessToken)
            //console.log(profile)

           const image = profile.photos[0].value

            let newUser = {
                googleID: profile.id,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                email: profile.emails[0].value,
                image: image
            }
            //Check for existing users
            User.findOne({
                googleID: profile.id
            }).then((user) => {
                if(user){
                    //return user
                    done(null, user)
                }else{
                    //create new user
                    new User(newUser)
                    .save()
                    .then((user) => done(null, user))
                }
            })

        })
    )
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser((id, done) => {
        User.findById(id).then(user => done(null, user))
    })
}

