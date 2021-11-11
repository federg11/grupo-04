const User = require('../services/userService');

async function userLoggedNavBarMiddleware(req, res, next) {
    res.locals.isLogged = false;
    
    let emailInCookie = req.cookies.userEmail;
    
    if(emailInCookie){
         let userFromCookie = await User.findByField("email", emailInCookie);
        // req.session.userLogged = userFromCookie;
        if(userFromCookie){
             req.session.userLogged = userFromCookie;
        }
    }

    if(req.session.userLogged){
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }
    next()
}

module.exports = userLoggedNavBarMiddleware;