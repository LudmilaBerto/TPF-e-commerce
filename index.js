const express=require('express');
const app=express()
const dotenv=require('dotenv')
dotenv.config({path:'./config/.env'}) //donde se encuentra el archivo .env
// constante de rutas
const tienda = require('./routers/tienda.route');
const PORT=process.env.PORT //variable de entorno PUERTO

// Configuro ejs como motor de plantilla
app.set('view engine', 'ejs')

// Configuracion de archivos estaticos(css, js, img)
app.use(express.static('public'))


// Ruta inicial
app.get('/', (req,res)=>{
    res.render('index')
})

// Rutas dinamicas
app.use('/tienda', tienda);



// Rutas estaticas

// Configuración del servidor
app.listen(PORT, ()=>{
    console.log(`El servidor esta corriendo en http://localhost:${PORT}/`)
})