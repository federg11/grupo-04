const express = require("express");
const router = express.Router();
//const { body } = require("express-validator");
const productosControllers = require("../controllers/productosControllers");
//const usuariosControllers = require("../controllers/userControllers");
//const userControllers = require("../controllers/userControllers");
const configMulter = require("../middlewares/productoMulter");
//const configuMulterUser = require("../middlewares/userMulter");
// const guestMiddleware = require("../middlewares/guestMiddleware");
// const authMiddleware = require("../middlewares/authMiddleware");
// const validacionesMiddleware = require("../middlewares/validaciones");


/* GET home */
router.get('/', productosControllers.listado);
/* GET product detail*/
router.get("/detail/:id", productosControllers.detalle);
/* GET Create product*/
router.get("/productsCreate", productosControllers.crearProducto);
router.post("/productsCreate", configMulter.single("img"), productosControllers.store);
//rutas para editar
router.get("/productEdit/:id", productosControllers.edit);
router.put("/productEdit/:id", configMulter.single("img"), productosControllers.update);
// rutas para eliminar
router.delete("/delete/:id", productosControllers.destroy);

/* GET login */
// router.get('/login',  userControllers.login);
// //router.post('/login', userControllers.loginProcess);
// /*GET register*/
// router.get('/register',  userControllers.register);
// router.post("/register", configuMulterUser.single("img"), userControllers.register);

//perfil de usuario
//router.get('/profile', authMiddleware, usuariosControllers.profile);

//router.get("/logout", usuariosControllers.logout);


/*GET product cart*/
// router.get("/productCart", userControllers.carrito );




// /*GET products (crear productos)*/
// /*5. / products /: id / edit(GET)*/
// router.get("/edit/:idProducts", productosControllers.edit);

module.exports = router;