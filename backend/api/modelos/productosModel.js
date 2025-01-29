
var productosModel={}
const mongoose = require("mongoose")

var Schema = mongoose.Schema

var productosSchema = new Schema({
   nombre:String,
   codigo:String,
   descripcion:String,
   cantidad:Number,
   estado:String,
   precio:Number,
   talla:String,
   imagen:String,
})

  const Mymodel = mongoose.model("productos", productosSchema)
 

  productosModel.ValidarCodigo = function (post,callback){
    //var posicion = datos.findIndex((item) => item.identificacion == post.identificacion)
    Mymodel.findOne({codigo:post.codigo}).then((respuesta)=>{
        if(respuesta == null){
            return callback ({existe:"No"})
        }
        else{
            return callback({existe:"si"})
        }
    })

}

productosModel.Guardar = function(post, callback){
    const instancia = new Mymodel
    instancia.nombre = post.nombre
    instancia.codigo = post.codigo 
    instancia.descripcion = post.descripcion
    instancia.cantidad = post.cantidad
    instancia.estado = post.estado
    instancia.precio = post.precio
    instancia.talla = post.talla
    instancia.imagen = post.imagen

 instancia.save().then((respuesta)=>{
     console.log(respuesta)
     return callback({state:true})
 }).catch((error)=>{
     console.log(error)
     return callback({state:false})
 })
       
 }



productosModel.Listar = function(post,callback){
   Mymodel.find({},{}).then((respuesta)=>{
         return callback({datos:respuesta})
   })     
}

productosModel.ListarId = function(post,callback){
    Mymodel.find({_id:post._id},{}).then((respuesta)=>{
          return callback({datos:respuesta})
    })     
 }

productosModel.Actualizar = function(post, callback){
   Mymodel.findByIdAndUpdate({_id:post._id},
    {
       nombre:post.nombre,
       descripcion:post.descripcion,
       cantidad:post.cantidad,
       estado:post.estado,
       precio:post.precio,
       talla:post.talla,
       imagen:post.imagen,

    }
   ).then((respuesta)=>{
     return callback({state:true})
   }).catch((error)=>{
    console.log(error)
   })
   
}

productosModel.Eliminar =function(post, callback){
   
   Mymodel.deleteOne({_id:post._id}).then((respuesta)=>{
    return callback({state:true})  
   }).catch((error)=>{
    console.log(error)
   })
   
    // datos.splice(post.posicion,1)
}


module.exports.productosModel = productosModel