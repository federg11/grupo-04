const fs= require("fs");
const path = require("path");

const dataJson = fs.readFileSync(path.join(__dirname, "../data/product.json"));
const productos = JSON.parse(dataJson)

function writeJson(){
    const data = JSON.stringify(productos)
    fs.writeFileSync(path.join(__dirname, "../data/product.json"),data)
    return
}

let productosControllers = {
    listado: (req, res)=>{
        //devolver una respuesta
        res.render("index", { productos })
    },
    detalle: (req, res) => {
        //buscar producto
        const productoEncontrado = productos.find(function(producto){
            return producto.id == req.params.id
        })
        res.render("productDetail",{ producto: productoEncontrado});
    },
    crearProducto: (req, res) => {
        res.render("productsCreate");
    },
    store: (req,res)=>{
        //crear producto
        const newProducto = {
            id: productos.length + 1,
            name: req.body.name,
            img: req.body.img,
            color: req.body.color,
            price: req.body.price,
            gb: req.body.almacenamiento,
            accesibilidad: req.body.accesibilidad,
            camara: req.body.camara,
            camara_delantera: req.body.camara_delantera,
            sonido: req.body.sonido,
            sim: req.body.sim,
            memoriaExterna: req.body.memoriaExterna,
        }
        productos.push(newProducto);

        //modificar JSON
        writeJson()
        //respuesta
        res.redirect("/")


    },
    edicionProducto: function(){},
    borradoProducto: function(){},
    
    
    edit: (req,res)=>{
        let idProducts = req.params.idProducts;
        res.send(idProducts);

    }
};


module.exports = productosControllers