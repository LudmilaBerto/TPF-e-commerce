const express = require('express');
const app = express();
const dotenv = require('dotenv');
const morgan = require('morgan');
const cookieParser=require('cookie-parser')
colors = require('colors'); //Le da colores a los console.log
const productos = require('./routers/productos');
const auth=require('./routers/auth')
const connectDB = require('./config/db');

// Configuración de dotenv
dotenv.config({ path: './config/.env' });

// Variables de entorno
const PORT = process.env.PORT || 3000;

// Conexión a la base de datos
connectDB();

// Configurar EJS como motor de plantilla
app.set('view engine', 'ejs');

// Archivos estáticos
app.use(express.static('public'));
// Middleware para analizar el cuerpo de la solicitud
app.use(express.urlencoded({ extended: true })); // Para datos del formulario
// Middleware para procesar JSON
app.use(express.json());
//cookie parser
app.use(cookieParser());
// Middleware para registro de solicitudes HTTP
app.use(morgan('dev'));

// Ruta para favicon.ico (para evitar errores del navegador)
app.get('/favicon.ico', (req, res) => res.status(204));

// Ruta inicial (index)
app.get('/', (req, res) => {
    res.render('index');
});
// Rutas Estaticas
// sobreNosotros
app.get('/sobreNosotros', (req, res) => {
    res.render('sobreNosotros');
});
// preguntas
app.get('/preguntas', (req, res) => {
    res.render('preguntas');
});
// contacto
app.get('/contacto', (req, res) => {
    res.render('contacto');
});
// Entregas
app.get('/entregas', (req, res) => {
    res.render('entregas');
});
// Habitaciones
app.get('/habitaciones', (req, res) => {
    res.render('habitaciones');
});
// Rutas dinámicas para productos
app.use('/tienda', productos);
app.use('/auth', auth)

// Manejo de errores 404 (Debe ir después de todas las rutas)
app.use((req, res, next) => {
    res.status(404).send('Página no encontrada');
});



// Configuración del servidor
app.listen(PORT, () => {
    console.log(`El servidor está corriendo en http://localhost:${PORT}/`.yellow.bold.underline);
});
