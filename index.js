const express=require('express');
const app=express()
// constante de rutas
const tienda = require('./public/router/tienda');


// Configuro ejs como motor de plantilla
app.set('view engine', 'ejs')

// Configuracion de archivos estaticos(css, js, img)
app.use(express.static('public'))


// Ruta inicial
app.get('/', (req,res)=>{
    res.render('index')
})
// Rutas estaticas
app.use('/tienda', tienda);

// Configuración del servidor
app.listen(4500, ()=>{
    console.log('El servidor esta corriendo')
})