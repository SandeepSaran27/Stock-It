const { getUser } = require("../services/auth");

async function restrictToLoggedinUserOnly(req, res, next){
    const userId = req.cookies?.uid;

    if(!userId)
        return res.json({msg : 'cookies not recieved @Middleware'});
        //return res.render('userLogInPage');
    
    const user = await getUser(userId);
    if(!user)
        return res.status(400).json({msg : 'userId not recieved from cookies @Middleware'});
        //return res.render('userLogInPage');

    //req.user = user;
    next();
}

module.exports = {
    restrictToLoggedinUserOnly,
}