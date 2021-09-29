const fs= require("fs");
const path = require("path");

const dataJson = fs.readFileSync(path.join(__dirname, "../data/product.json"));
const productos = JSON.parse(dataJson)

function writeJson(){
    const data = JSON.stringify(productos, null, 4)
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
            description: req.body.description,
            img: req.file.filename,
            price: req.body.price,
            // color: req.body.color,
            // gb: req.body.almacenamiento,
            // accesibilidad: req.body.accesibilidad,
            // camara: req.body.camara,
            // camara_delantera: req.body.camara_delantera,
            // sonido: req.body.sonido,
            // sim: req.body.sim,
            // memoriaExterna: req.body.memoriaExterna,
        }
        productos.push(newProducto);

        //modificar JSON
        writeJson()
        //respuesta
        res.redirect("/")
    },

    edit: (req, res) => {
        const productoEncontrado = productos.find(function (producto) {
            return producto.id == req.params.id;
        });
        res.render("productEdit", { producto: productoEncontrado });
    },

    update: (req, res) => {
        const producto = productos.find(function (producto) {
            return producto.id == req.params.id;
        });
        producto.name = req.body.name,
        producto.description = req.body.description,
        producto.img = req.file ? req.file.filename : producto.img,
        producto.category = req.body.category,
        producto.color = req.body.color,
        producto.storage= req.body.storage,
        producto.price = Number(req.body.price),
        producto.gb = req.body.gb,
        producto.accesibilidad = req.body.accesibilidad,
        producto.camara = req.body.camara,
        producto.camara_delantera = req.body.camara_delantera,
        producto.sonido = req.body.sonido,
        producto.sim = req.body.sim,
        producto.memoriaExterna = req.body.memoriaExterna,

        writeJson();
        res.redirect("/")
    },

    destroy: (req, res) => {
        const producto = productos.find(function (producto) {
            return producto.id == req.params.id;
        })
        const productoIndex = productos.findIndex(function (producto) {
            return producto.id == req.params.id;
        });
        productos.splice(productoIndex, 1);
        fs.unlinkSync(path.join(__dirname, "../../public/img/" + producto.img));
        writeJson();
        res.redirect("/");
    }
};

module.exports = productosControllers;