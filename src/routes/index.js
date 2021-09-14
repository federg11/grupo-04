const express = require("express");
const productosControllers = require("../controllers/productosControllers");
const userControllers = require("../controllers/userControllers");
const router = express.Router();

/* GET home */
router.get('/', userControllers.home);

/* GET login */
router.get('/login', userControllers.login);

/*GET register*/
router.get('/register', userControllers.register);

/* GET product detail*/
router.get('/productDetail', productosControllers.detalle);

/*GET product cart*/
router.get("/productCart", userControllers.carrito );

/*GET products (crear productos)*/

router.get("/products", productosControllers.crearProducto);

module.exports = router;