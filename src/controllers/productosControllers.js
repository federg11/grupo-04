let productosControllers = {
    listado: function(){},
    crearProducto: (req, res) => {
        res.render("products", { title: "Formulario ingreso prod" });
    },
    detalle: (req, res) => {
        res.render("productDetail", { title: "Detalle de producto" })
    },
    edicionProducto: function(){},
    borradoProducto: function(){},
    
    create: (req, res)=>{
         res.send(req.body.Nombre)
     },
    
    edit: (req,res)=>{
        let idProducts = req.params.idProducts;
        res.send(idProducts);

    }
};


module.exports = productosControllers