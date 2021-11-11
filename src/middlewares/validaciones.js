const path = require("path");
const {body} = require("express-validator");

const validaciones = [

    body("nombre").notEmpty()
    .withMessage("Debes ingresar un nombre"),

    body("apellido").notEmpty()
    .withMessage("Debes ingresar un apellido"),

    body("email").notEmpty()
    .withMessage("Tienes que ingresar un mail")
    .bail()
    .isEmail()
    .withMessage("Debes ingresar un correo válido"),

    body("usuario").notEmpty()
    .withMessage("Debes ingresar un usuario"),

    body("password").notEmpty()
    .withMessage("Tines que ingresar una contraseña")
    .bail()
    .isLength({min: 4})
    .withMessage("La contraseña como minimo tiene que tener 4 caracteres"),

    body("img").custom((value, {req}) => {
        let file = req.file;
        let extensionesPermitidas = [".jpg", ".png", ".jpeg"];

        if(!file){
            throw new Error("Tenes que subir una imagen");
        }else{
            let fileExtension = path.extname(file.originalname);
            if(!extensionesPermitidas.includes(fileExtension)){
                throw new Error("las extensiones permitidas son .jpg, .png, .jpeg");
            }
        }
        return true;
    }),

];

module.exports = validaciones;