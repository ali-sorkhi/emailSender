const mongoose = require('mongoose');
const {Schema} = mongoose; //what property each record or collection has 

const userSchema = new Schema({
    googleId: String,
    credits: { type: Number, default: 0 }
});

mongoose.model('users', userSchema); //creating new collection named 'users' and poperty of userSchema