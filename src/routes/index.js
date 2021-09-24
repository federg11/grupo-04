const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const productosControllers = require("../controllers/productosControllers");
const userControllers = require("../controllers/userControllers");


/* GET home */
router.get('/', userControllers.home);

/* GET login */
router.get('/login', userControllers.login);
router.post('/login', userControllers.entry);
/*GET register*/
router.get('/register', userControllers.register);
/* GET product detail*/
router.get('/productDetail', productosControllers.detalle);

/*GET product cart*/
router.get("/productCart", userControllers.carrito );

/*GET products (crear productos)*/
router.get("/products", productosControllers.crearProducto);

/*5. / products /: id / edit(GET)*/
router.get("/edit/:idProducts", productosControllers.edit);

router.post("/products", productosControllers.create)

module.exports = router;