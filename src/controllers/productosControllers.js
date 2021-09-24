const fs=require("fs");
const path = require("path");

const dataJson = fs.readFileSync(path.join(__dirname, "../data/product.json"));
const productos = JSON.parse(dataJson)

let productosControllers = {
    listado: (req, res)=>{
        //devolver una respuesta
        res.render("index")
    },
    crearProducto: (req, res) => {
        res.render("products", { title: "Formulario ingreso prod" });
    },
    detalle: (req, res) => {
        res.render("productDetail", { title: "Detalle de producto" })
    },
    edicionProducto: function(){},
    borradoProducto: function(){},
    
    create: (req, res)=>{
         res.send(req.body)
     },
    
    edit: (req,res)=>{
        let idProducts = req.params.idProducts;
        res.send(idProducts);

    }
};


module.exports = productosControllers