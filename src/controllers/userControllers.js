let userControllers = {
    login: (req, res) => {
        res.render("login", { title: "Login" });
    },
    entry: (req, res) => {
            let usuario = {
                email: req.body.email,
            };
            res.send(usuario);
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
    create: (req, res) => {
        res.send(req.body.email)
    }


}

module.exports = userControllers;