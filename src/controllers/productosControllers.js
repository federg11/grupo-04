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
};

module.exports = productosControllers