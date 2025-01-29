
var entrenamientosModel={}
const mongoose = require("mongoose")

var Schema = mongoose.Schema

var entrenamientosSchema = new Schema({
   nombre:String,
   codigo:String,

})

  const Mymodel = mongoose.model("entrenamientos", entrenamientosSchema)
 

  entrenamientosModel.ValidarCodigo = function (post,callback){
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

entrenamientosModel.Guardar = function(post, callback){
    const instancia = new Mymodel
    instancia.nombre = post.nombre
    instancia.codigo = post.codigo 
 
 instancia.save().then((respuesta)=>{
     console.log(respuesta)
     return callback({state:true})
 }).catch((error)=>{
     console.log(error)
     return callback({state:false})
 })
       
 }



entrenamientosModel.Listar = function(post,callback){
   Mymodel.find({},{}).then((respuesta)=>{
         return callback({datos:respuesta})
   })     
}

entrenamientosModel.ListarId = function(post,callback){
    Mymodel.find({_id:post._id},{}).then((respuesta)=>{
          return callback({datos:respuesta})
    })     
 }

entrenamientosModel.Actualizar = function(post, callback){
   Mymodel.findByIdAndUpdate({_id:post._id},
    {
       nombre:post.nombre,
    }
   ).then((respuesta)=>{
     return callback({state:true})
   }).catch((error)=>{
    console.log(error)
   })
   
}

entrenamientosModel.Eliminar =function(post, callback){
   
   Mymodel.deleteOne({_id:post._id}).then((respuesta)=>{
    return callback({state:true})  
   }).catch((error)=>{
    console.log(error)
   })
   
    // datos.splice(post.posicion,1)
}


module.exports.entrenamientosModel = entrenamientosModel