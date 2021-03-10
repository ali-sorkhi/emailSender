const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

//using cookies:
app.use(
    cookieSession({
        maxAge: 30*24*60*60*1000 , //maximum time that cookie exist in browser by miliseconds
        keys: [keys.cookieKey] //encrypting cookies
    })
);

//making passport use cookies
app.use(passport.initialize());
app.use(passport.session());

const port =process.env.PORT || 5000;

require('./routes/authRoutes')(app);


app.listen(port);
