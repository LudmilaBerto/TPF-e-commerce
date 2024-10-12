const Usuario=require('../model/Usuarios')
const jwt = require('jsonwebtoken');


//@desc   MOSTRAR Registros Usuarios Nuevos
//@route  GET /api/v1/auth/register
//@access Publico


exports.getRegistrar=async(req,res,next)=>{
    try{
        const mensaje = req.query.mensaje || null;  // Tomar el mensaje de la URL si existe
        res.render('register', { mensaje })
    }catch(error){
       res.status(400).json({mensaje:`Ocurrió un error: ${error.message}`}) 

    }
}




//@desc   ENVIAR Registro De Usuario Nuevo
//@route  POST /auth/register 
//@access Publico

exports.postRegistrar=async(req,res,next)=>{
    try{

        const {name,email,password,role}=req.body

        const usuario=await Usuario.create({
            name,email,password,role
        })

        res.redirect('/auth/register?mensaje=Registro exitoso. Ahora puedes iniciar sesión.');

    }catch(error){

        res.status(400).json({mensaje:`Ocurrió un error: ${error.message}`})

    }
}



//@desc   MOSTRAR login Usuario
//@route  GET /auth/login
//@access Publico


exports.getLogin=async(req,res,next)=>{
    try{
        res.render('login'); // Renderiza la página de login
    }catch(error){
        res.status(400).json({mensaje:`Ocurrió un error: ${error.message}`}) 

    }
}


//@desc   ENVIAR login Usuario
//@route  POST /auth/login
//@access Publico

exports.postLogin=async(req,res,next)=>{
    try{

        const {email,password}=req.body

        //validar el email y la contraseña

        if(!email || !password){
            return res.status(400).json({ mensaje: 'Por favor, ingrese email y contraseña' })
        }

        // Buscar el usuario por email y comparo el dato que ingreso con los datos de la BD
        const usuario=await Usuario.findOne({email}).select('+password')

        if(!usuario){
            return res.status(400).json({ mensaje: 'El usuario no está registrado' });
        }

        // Descencriptar la contraseña guardada en BD para compararla con la que ingresó el usuario
        //  Verificar las contraseñas
        
          const sonIguales=await usuario.matchPassword(password);

          if(!sonIguales){
            return res.status(400).json({ mensaje: 'La contraseña es incorrecta' });
        }
        
        // Enviar el token y respuesta con sendTokenResponse
        sendTokenResponse(usuario, 200, res);

       
    }catch(error){

        res.status(400).json({mensaje:`Ocurrió un error: ${error.message}`}) 

    }
}

//@desc   MOSTRAR dashboard Usuario
//@route  GET /auth/dashboard
//@access Privado

exports.getDashboard=async(req,res,next)=>{
    try {
        // Obtener el token de las cookies
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ mensaje: 'No estás autorizado' });
        }

        // Verificar el token y obtener el ID del usuario
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const usuario = await Usuario.findById(decoded.id);

        if (!usuario) {
            return res.status(401).json({ mensaje: 'No estás autorizado' });
        }

        // Renderiza el dashboard, pasando la información del usuario
        res.render('dashboard', { usuario }); // Pasa el usuario a la vista
    } catch (error) {
        res.status(500).json({ mensaje: `Ocurrió un error: ${error.message}` });
    }
}

// Función para enviar token en una cookie
const sendTokenResponse=(usuario,statusCode,res)=>{

    //creo un token JWT
    const token=usuario.getSignedJwtToken();

    // Opciones de la cookie (expira en los días especificados)
    const options={
        expires:new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000), // 18/9/2024  => 30 dias =>1dias => esto finaliza 
        httpOnly:true
    };

    // Enviar cookie y respuesta
    res
        .status(statusCode)
        .cookie('token', token, options)
        .redirect('/auth/dashboard'); // Redirigir después de establecer la cookie
}