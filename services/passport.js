const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

//how to accsess mongoose models properly:
const mongoose = require('mongoose');
const User = mongoose.model('users');

//for seting user cookie
passport.serializeUser(
    (user, done)=>{
        done(null, user.id);
    }
);

passport.deserializeUser(
    (id, done)=>{
        User.findById(id).then(
            user => {
                done(null,user);
            }
        )
    }
);

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done)=>{
            User.findOne({googleId: profile.id}).then(
                (existingUser) =>{
                    if(existingUser){
                        // user exists in collection
                        done(null /*error*/,existingUser /*user record*/);
                    }else{
                        //adding new record to user model
                        new User ({googleId: profile.id}).save().then(
                            user=> {
                                return done(null, user);
                            }
                        ); 
                    }
                }
            )
        }
    )
);
