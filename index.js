const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser= require('body-parser');
const keys = require('./config/keys');

//adding models:
require('./models/User');
require('./models/Surveys');

require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

//body parser for payment request
app.use(bodyParser.json());

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

//adding routes:
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

//for our app to work correctly in production:
if(process.env.NODE_ENV === 'production'){
    //Express will serve up production asset
    //like our main.js file or main.css file
    app.use(express.static('client/build'));

    //Express will serve up index.html file 
    //if it doesn't recognize the route
    const path = require ('path');
    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(port);
