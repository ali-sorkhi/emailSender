const mongoose = require('mongoose');
const {Schema} = mongoose; //what property each record or collection has 

const userSchema = new Schema({
    googleId: String,

});

mongoose.model('users', userSchema); //creating new collection named 'users' and poperty of userSchema