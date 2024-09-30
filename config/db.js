const mongoose=require('mongoose')
const connectDB= async()=>{
    const conexion= await mongoose.connect(process.env.MONGO_URL)
    console.log('Se conecto a Mongo')
}

module.exports= connectDB