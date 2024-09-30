const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'Por favor ingrese el nombre del producto']
  },
  descripcionBreve: {
    type: String,
    required: [true, 'Por favor ingrese una descripción breve'],
    maxlength: [360, 'La descripción breve no puede tener más de 360 caracteres'],
  },
  descripcionLarga: {
    type: String,
    required: [true, 'Por favor ingrese una descripción larga'],
  },
  precio: {
    type: Number,
    required: [true, 'Por favor ingrese el precio del producto'],
  },
  colores: {
    type: Map,
    of: String,  // La URL de la imagen
    required: [true, 'Por favor seleccione los colores disponibles para este producto'],
  },
  entregasAPartirDe: {
    type: Date,  
    default: Date.now,
    required: [true, 'Por favor ingrese la fecha de entrega'],
  },
  devolucionGratuitaDias: {
    type: Number,
    required: [true, 'Por favor ingrese los días de devolución gratuita'],
  },
  equipo: {
    type: String,
    required: [true, 'Por favor ingrese el equipo del producto (piezas, kit, etc )'],
  },
  caracteristicas: [{
    tipo: { type: String, required: true },
    detalles: {
      tapiceria: { type: String },
      base: { type: String },
      anchoCm: { type: Number },
      longitudCm: { type: Number },
      profundidadCm: { type: Number },
      pesoKg: { type: Number },
      tipoDeColchon: { type: String },
      formaDeSofa: { type: String },
      despliegue: { type: String },
      pais: { type: String },
      garantia: { type: Number },
    },
  }],
  imagenDestacada: {
    type: String,
    required: [true, 'Por favor suba la imagen destacada del producto'],
  },
  imagenesAdicionales: {
    type: [String], // Un array de URLs para imágenes adicionales
    default: [] // Si no hay imágenes adicionales, será un array vacío
  },
  categoria: {
    categoriaPrincipal: {
      type: String, 
      enum: ['Dormitorio', 'Cocina', 'Sala de estar', 'Comedor', 'Habitaciones de niños', 'Baño', 'Oficina', 'Balcón y terraza', 'Accesorios'],
      required: [true, 'Por favor seleccione una categoría principal'],
    },
    subcategoria: {
      type: String,
      enum: ['Sofás', 'Mesas', 'Sillas', 'Camas', 'Escritorios','Otros'],
      required: [true, 'Por favor seleccione una subcategoría'],
    },
  },
  tipoDeMueble: {
    type: String,
    enum: ['sofás', 'armarios', 'mesas de centro', 'muebles de TV', 'sillones', 'estantes'],
  },
  coloresDeMuebles: {
    type: [String],
    enum: [
      'blanco', 'beige', 'gris', 'rojo', 'amarillo', 'azul marino', 'verde oliva', 'rosa pálido', 
      'madera clara', 'madera oscura', 'roble oscuro', 'negro', 'nude', 'marrón', 'otro'
    ],
    required: [true, 'Por favor seleccione los colores del mueble'],
  },
  tamanio: {
    type:String,
    enum: ['Pequeño', 'Mediano', 'Grande', 'Extra Grande'],
    required: [true, 'Por favor ingrese el tamaño del producto'],
  },
  tipoDeSofa: {
    type: String,
    enum: ['Sofá de cuero', 'Sofá de dos plazas', 'Sofá de tres plazas', 'Sofá para uno'],
    required:function() {
      return this.tipoDeMueble.includes('sofás'); // Solo requerido si es un sofá
    }
  },
  reseñas: [{
    nombreUsuario: {
      type: String,
      required: [true, 'Por favor ingrese el nombre del usuario que hace la reseña'],
    },
    fecha: {
      type: Date,
      default: Date.now,
    },
    opinion: {
      type: String,
      required: [true, 'Por favor ingrese la opinión del usuario sobre el producto'],
    },
    puntuacion: {
      type: Number,
      min: [1, 'La puntuación mínima es 1'],
      max: [10, 'La puntuación máxima es 10'],
      required: [true, 'Por favor ingrese una puntuación para el producto'],
    }
  }]
});

module.exports = mongoose.model('Productos', productoSchema);
