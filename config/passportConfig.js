const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
let User = mongoose.model('User');

passport.use(
    new localStrategy({userNameField: 'email'}, 
        (username, password, done) => {
            User.findOne({ email: username },
                (err, user) => {
                    if(err)
                        return done(err)
                    else
                        if(!user)
                            return done(null, false, {message: 'Email is not registerd'})
                    else
                        if(!user.verifyPassword(password))
                            return done(null, false, { message: 'Wrong password' })
                    else
                        return done(null, user);
                })
        })
 );