const express = require("express");
const router = express.Router();

/* GET home */
router.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

/* GET login */
router.get('/login', (req, res) => {
    res.render("login", { title: "Login"});
});

/*GET register*/
router.get('/register', (req, res) => {
    res.render("register", { title: "Register"});
});

/* GET product detail*/
router.get('/productDetail', (req, res) => {
    res.render("productDetail",{ title: "Detalle de producto"});
});

/*GET product cart*/
router.get("/productCart", (req, res) => {
    res.render("productCart", { title: "Carrito"});
});

module.exports = router;