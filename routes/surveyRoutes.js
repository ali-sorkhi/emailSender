const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplates');

const Survey = mongoose.model('survey'); //using survey model

module.exports = app =>{
    app.post('/api/surveys', requireLogin, requireCredits, (req, res)=>{
        const { title, subject, body, recipients } = req.body;

        const survey = new Survey({
            title,
            subject,
            body,
            //converting , seperated emails to array of strings and then maping it:
            recipients: recipients.split(',').map(email => ({email})), 
            _user: req.user.id,
            dateSent: Date.now()
        });

        //send emails after survey form is complete:
        const mailer= new Mailer(survey, surveyTemplate(survey));
        mailer.send();
    });
};