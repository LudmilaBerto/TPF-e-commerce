const Productos=require('../model/producto.js')

//@desc obtenemos/renderizamos todos los productos
//@route GET  tienda/
//@access Public

// http://localhost:4500/tienda/

exports.getProductos=async(req,res,next)=>{
	try{
		const productos= await Productos.find()
		if (!productos) {

            return res.status(404).json({ mensaje: 'Productos no encontrado' });
        }
		
		res.render('catalogo',{productos})
		

	}catch(error){
		res.status(400).json({mensaje:`Ocurrió un error: ${error.message}`}) 
	}
}


//@desc Renderizamos un producto especifico
//@route GET tienda/productos/:id
//@access Private

// http://localhost:4500/tienda/productos/:id
exports.getProducto=async(req,res,next)=>{
	try{
		const producto = await Productos.findById(req.params.id)
		if (!producto) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
		res.render('producto',{producto})

	}catch(error){
		res.status(400).json({mensaje:`Ocurrió un error: ${error.message}`}) 
	}
}
// 
// 
// 
exports.getCarrito=(req,res,next)=>{
	try{
		res.render('carrito')
	}
    catch{
		res.status(400).json({mensaje:`Ocurrió un error: ${error.message}`})
	}
}

//@desc crear un producto
//@route POST tienda/
//@access Private

// http://localhost:4500/tienda/

exports.postProducto=async(req,res,next)=>{
	try{
		const productos= await Productos.create(req.body)
	res.status(202).json({resultado:true, mensaje:'Producto creado exitosamente', datos:productos})

	}catch(error){
		res.status(400).json({mensaje:`Ocurrió un error: ${error.message}`}) 
	}
}

//@desc actualizar un solo producto
//@route PUT tienda/productos/:id
//@access Private

// http://localhost:4500/tienda/productos/:id

exports.putProducto=async(req,res,next)=>{
	try{
		const productos=await Productos.findByIdAndUpdate(req.params.id, req.body)
		res.status(202).json({
			resultado:true, 
			mensaje:`Se actualizó el Producto: ${req.params.id}`,
			datos:productos
		})

	}catch(error){

		res.status(400).json({mensaje:`Ocurrió un error: ${error.message}`}) 

	}
}

//@desc eliminar un solo Producto
//@route DELETE /tienda/productos/:id
//@access Private

// http://localhost:4500/tienda/productos/:id

exports.deleteProducto=async(req,res,next)=>{
    try {
        await Productos.findByIdAndDelete(req.params.id);
        res.status(202).json({
            resultado: true, 
            mensaje: `El producto con ID: ${req.params.id} ha sido eliminado`
        });
    } catch (error) {
        res.status(400).json({ mensaje: `Ocurrió un error: ${error.message}` });
    }
}
