const userLogged = require("./userLoggedNavBarMiddleware");

module.exports = (req, res, next) => {
    let user = req.session.userLogged;
    if(user.admin == 1){
        next();
    }else{
        res.send("no tenes permiso para acceder a esta parte de la web");
    }
}