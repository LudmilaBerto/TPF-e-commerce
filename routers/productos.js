const express=require('express')
const router=express.Router()
const {getProductos, getProducto, getCarrito, postProducto, putProducto, deleteProducto} = require('../controllers/productos')

// Ruta para obtener todos los productos(Shop) y crear un nuevo producto
//  http://localhost:4500/tienda/
router.route('/').get(getProductos).post(postProducto)

// Ruta para obtener, actualizar o eliminar un producto específico por ID
// http://localhost:4500/tienda/productos/:id
router.route('/productos/:id').get(getProducto).put(putProducto).delete(deleteProducto)

// http://localhost:4500/tienda/carrito
router.route('/carrito').get(getCarrito)


//exporto al index.js
module.exports = router