const mongoose = require('mongoose');
const {Schema} = mongoose; 

const recipientSchema = new Schema({
    email: String, 
    respond: { type: Boolean, default: false},
});

//because we want to use this as sub collection of survey model (4mb limit for each document)
 module.exports = recipientSchema; 