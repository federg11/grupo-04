let userControllers = {
    login: (req, res) => {
        res.render("login", { title: "Login" });
    },
    register: (req, res) => {
        res.render("register", { title: "Register" });
    },
    home: (req, res) => {
        res.render('index', { title: 'Home' });
    },
    carrito: (req, res) => {
        res.render("productCart", { title: "Carrito" });
    },


}

module.exports = userControllers;