const express = require("express");
const router = express.Router();

//controllers
const usersControllers = require("../controllers/userControllers");

//middlewares
const configMulterUser = require("../middlewares/userMulter");
const validations = require("../middlewares/validaciones");
const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

//rutas de usuarios
router.get("/register", guestMiddleware, usersControllers.register);
router.post("/register", configMulterUser.single("img"),validations, usersControllers.processRegister);
router.get("/login", guestMiddleware, usersControllers.login);
router.post("/login", usersControllers.processLogin);
router.get("/userProfile/", authMiddleware, usersControllers.profile);
router.get("/editUser/:id", usersControllers.edit);
router.put("/editUser/:id", usersControllers.update);
router.get("/logout", usersControllers.logout);

module.exports = router;