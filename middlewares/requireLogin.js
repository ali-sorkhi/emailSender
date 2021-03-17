module.exports = (req, res, next)=> {
    if(!req.user){ //user not login
        return res.status(401).send({error: 'You must log in!'});
    }
    next();
};