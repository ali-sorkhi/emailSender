const re= /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
// eslint-disable-next-line import/no-anonymous-default-export
export default (emails)=> {
    const invalidEmails= emails.split(',').map(email => email.trim()).filter(email => re.test(email) === false);
    if (invalidEmails.length){
        return `These Emails are invalid: ${invalidEmails}`;
    }
    return;
};