const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");

// const dataJson = fs.readFileSync(path.join(__dirname, "../data/product.json"));
// const usuarios = JSON.parse(dataJson);
// function writeJson() {
    //     const data = JSON.stringify(usuarios, null, 4)
    //     fs.writeFileSync(path.join(__dirname, "../data/user.json"), data)
    //     return
    // }
    // const usuariosFileName = path.join(__dirname, "../data/user.json");
    // const usuarios = JSON.parse(fs.readFileSync(usuariosFileName, "utf-8"));
    
    const User = require('../services/userService');
    
    const userControllers = {
        register: (req, res) => {
            res.render("register");
        },
        processRegister: (req, res) => {
            const resultValidation = validationResult(req);

            if (resultValidation.errors.length > 0) {
                return res.render("register", {
                    errors: resultValidation.mapped(),
                    oldData: req.body,
                });
            }

            let userInDB = User.findByField("email", req.body.email);

            if (userInDB) {
                return res.render("Register", {
                    errors: {
                        email: {
                            msg: "Este email ya está registrado",
                        },
                    },
                    oldData: req.body,
            });

        }
        
        User.create(req.body, req.file);
        return res.redirect("/user/login");
    },
    login: (req, res) => {
       return res.render("login");
    },
    processLogin: async (req, res) => {
        let userToLogin = await User.findByField("email", req.body.email);
        if (userToLogin) {
            let isOkThePassword = bcryptjs.compareSync(
                req.body.password,
                userToLogin.password
            );
            if(isOkThePassword){
                delete userToLogin.password;
                req.session.userLogged = userToLogin;

                if(req.body.remember_user){
                    res.cookie("userEmail", req.body.email, {maxAge: 1000 * 60 * 60});
                }
                return res.redirect("/user/userProfile");
            }
            return res.render("register", {
                errors: {
                    email: {
                        msg: "Las credenciales son incorrectas",
                    },
                },
            });
        }
        return res.render("login", {
            errors: {
                email: {
                    msg: "Este email no se encuentra en el sistema",
                },
            },
        });
    },
    profile: (req, res) => {
        return res.render("userProfile", {
            user: req.session.userLogged,
        });
    },
    edit:  (req, res) => {
        const user =  User.findByPk(req.params.id);
        res.render("editUserProfile", {user}); 
    },
    update: async (req, res) => {
        await User.update(
            {
                ...req.body,
                img: req.file.filename,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );
        res.redirect("/user/userProfile");
    },
    logout: (req, res) => {
        res.clearCookie("userEmail");
        req.session.destroy();
        return res.redirect("/");
    }
} 
    module.exports = userControllers;



// let userControllers = {
//     register: (req, res) => {
//         res.render("register");
//     },
//     processRegister: (req, res) => {
//         const resultValidation = validationResult(req);

//         if (resultValidation.errors.length > 0) {
//             return res.render("/register", {
//                 errors: resultValidation.mapped(),
//                 olData: req.body
//             });
//         }
//         return res.send('Ok, las validaciones se pasaron y no tienen errores');
//     },
//     login: (req, res) => {
//         return res.render("login", { title: "Login" });
//     },

//     loginProcess: (req, res) => {
//         let userToLogin = User.findByField("email", req.body.email);

//         if (userToLogin) {
//             let isPasswordOk = bcryptjs.compareSync(req.body.password, userToLogin.password);
//             if (isPasswordOk) {
//                 delete userToLogin.password;
//                 req.session.userLogged = userToLogin;
//                 return res.send('/login/profile');
//             }
//             return res.render("login", {
//                 errors: {
//                     email: {
//                         msg: 'las credenciales son inválidas'
//                     }
//                 }
//             })
//         }
//     },

//     logout: (req, res) => {
//         req.session.destroy();
//         return res.redirect("/");
//     },
//     entry: (req, res) => {
//         let usuario = {
//             email: req.body.email,
//         };
//         res.send(usuario);
//     },

//     carrito: (req, res) => {
//         res.render("productCart", { title: "Carrito" });
//     },
//     userCreate: (req, res) => {
//         //crear usuario
//         const newUser = {
//             id: usuarios.length + 1,
//             nombre: req.body.nombre,
//             apellido: req.body.apellido,
//             email: req.body.email,
//             usuario: req.body.usuario,
//             password: bcryptjs.hashSync(req.body.password, 10),
//             img: req.file.filename

//         }
//         usuarios.push(newUser);

//         //modificar JSON
//         writeJson()
//         //respuesta
//         res.redirect("/login")
//     }
// };


// module.exports = userControllers;


// const controllerUsers = {
//     register: (req, res) => {
//         return res.render("register")
//     },
//     processRegister: (req, res) => {
//         const resultValidation = validationResult(req);

//         if (resultValidation.errors.length > 0) {
//             return res.render("register", {
//                 errors: resultValidation.mapped(),
//                 olData: req.body,
//             });
//         }
//         console.log(req.body, req.file);
//         let userToCreate = {
//             ...req.body,
//             img: req.file.filename
//         }

//         User.create(userToCreate);
//         res.redirect("login");
//     },    
//     login: (req, res) => {
//         res.render("login");
//     },

//     loginProcess: (req, res) => {
//         let userToLogin = User.findByField("email", req.body.email);
//         if(userToLogin){
//             let passwordIsOkey = bcryptjs.compareSync(
//                 req.body.password,
//                 userToLogin.password
//             );
//             if(passwordIsOkey) {
//                 delete userToLogin.password;
//                 req.session.userLogged = userToLogin;

//                 if(req.body.rememberMe){
//                     res.cookie("userEmail", req.body.email, {maxAge: 1000 * 60 * 5,});
//                 }
//                 return res.redirect("/profile");
//             }
//         return res.render("login", {
//             errors: {
//                 email: {
//                     msg: "Los datos ingresados no coinciden, intente de nuevo",
//                 },
//             },
//         });
//     }
//         return res.render("register", {
//             errors: {
//                 email: {
//                     msg: "No se encuentra el mail en la BD",
//                 },
//             },
//         });
//     },
    // create : (req, res) => {
    //     const newUser = {
    //          id: usuarios.length + 1,
    //          nombre: req.body.nombre,
    //          apellido: req.body.apellido,
    //          email: req.body.email,
    //          usuario: req.body.usuario,
    //          password:bcryptjs.hashSync(req.body.password, 12),
    //          img: req.file.filename

    //         }

    //         usuarios.push(newUser);
    //         writeJson();
    //         res.redirect("login");
    // },
    // profile: (req, res) => {
    //     return res.render('userProfile', {
    //         user: req.session.userLogged
    //     });
    // },

    // logout: (req, res) => {
    //     res.clearCookie("userEmail");
    //     req.session.destroy();
    //     return res.redirect("/")
    // },

// };

// module.exports = controllerUsers;

