const mongoose = require('mongoose');
const {Schema} = mongoose; //what property each record or collection has 

const RecipientSchema = require('./Recipient') //how to use sub collection

const surveysSchema = new Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [RecipientSchema], //array of RecipientSchema - using sub collection
    yes: { type: Number, default: 0},
    no: { type: Number, default: 0},
    dateSent: Date,
    lastResponded: Date,
    _user: { type: Schema.Types.ObjectId, ref: 'User' }, //reference to user model
});

mongoose.model('survey', surveysSchema); //creating new collection named 'surveys' and poperty of surveySchema 