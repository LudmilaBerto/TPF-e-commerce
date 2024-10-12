const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const usuariosSchema= new mongoose.Schema({
    name:{
        type:String,
        require:[true, 'Por favor, ingrese un nombre']
    },
    email:{
        type:String,
        require:[true, 'Ingrese una email'],
        unique:true,
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Por favor, ingrese un email valido']
    },
    role:{
        type:String,
        enum:['Usuario','Admin'],
        default:'user'
    },
    password:{
        type:String,
        require:[true, 'Ingrese una contraseña'],
        minlength:[6, 'La contraseña debe tener minimo 6 caracteres'],
        select:false
    },
    reestablecerPasswordToken:String,
    reestablecerPasswordExpirado:Date,
    createdAt:{
        type:Date,
        default:Date.now
    }

})

// Encriptamos la contraseña
usuariosSchema.pre('save', async function(next){

    if (!this.isModified('password')) {
        next(); // Si la contraseña no ha sido modificada, pasa al siguiente middleware
    }

    const salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password, salt)
})

// Método para generar un JWT para el usuario
usuariosSchema.methods.getSignedJwtToken=function(){
    return jwt.sign(
        {id:this._id},
        process.env.JWT_SECRET, //JWT_SECRET esta en el archivo .env (variable global)
        {expiresIn:process.env.JWT_EXPIRE} //JWT_EXPIRE esta en el archivo env (variable global)

    )
}

// Compara la contraseña ingresada por el usuario con la almacenada en la base de datos
usuariosSchema.methods.matchPassword=async function(passwordFormulario){
    return await bcrypt.compare(passwordFormulario, this.password)
}

module.exports=mongoose.model('Usuario', usuariosSchema)