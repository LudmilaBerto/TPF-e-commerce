const express=require('express');
const app=express()
const dotenv=require('dotenv')
dotenv.config({path:'./config/.env'}) //donde se encuentra el archivo .env
// constante de rutas
const PORT=process.env.PORT //variable de entorno PUERTO
//conexión DB
const connectDB=require('./config/db')
const morgan=require('morgan')
const productos=require('./routers/productos')
//Ejecutamos la función de conexión DB
connectDB()

// Configuro ejs como motor de plantilla
app.set('view engine', 'ejs')
// Configuracion de archivos estaticos(css, js, img)
app.use(express.static('public'))
// Middleware para procesar datos en formato JSON
app.use(express.json());
//configuración de Morgan
app.use(morgan('dev'))

// Ruta inicial
app.get('/', (req,res)=>{
    res.render('index')
})

// Rutas dinamicas
app.use('/tienda', productos);


// Rutas estaticas


// Configuración del servidor
app.listen(PORT, ()=>{
    console.log(`El servidor esta corriendo en http://localhost:${PORT}/`)
})