const express=require('express')
const router=express.Router() 
const {getProductos, getHabitaciones , getMuebles, getTamano ,getSofa, getProducto, getCarrito , postProducto, putProducto, deleteProducto} = require('../controllers/productos')

// Ruta para obtener todos los productos(Shop) y crear un nuevo producto
//  http://localhost:4500/tienda/
router.route('/').get(getProductos).post(postProducto)

//  http://localhost:4500/tienda/Habitacion/:categoria
router.route('/habitacion/:categoria').get(getHabitaciones)

//  http://localhost:4500/tienda/Mueble/:subCategoria
router.route('/Mueble/:subCategoria').get(getMuebles)

//  http://localhost:4500/tienda/Tamano/:tamano
router.route('/Tamano/:tamano').get(getTamano)

//  http://localhost:4500/tienda/TipoDeSofa/:sofa
router.route('/TipoDeSofa/:sofa').get(getSofa)

// Ruta para obtener, actualizar o eliminar un producto específico por ID
// http://localhost:4500/tienda/productos/:id
router.route('/productos/:id').get(getProducto).put(putProducto).delete(deleteProducto)

// http://localhost:4500/tienda/carrito
router.route('/carrito').get(getCarrito)


//exporto al index.js
module.exports = router