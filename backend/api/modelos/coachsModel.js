
var coachsModel={}
const mongoose = require("mongoose")

var Schema = mongoose.Schema

var coachsSchema = new Schema({
   
   codigo:String,
   imagen:String,
   nombre:String,
   
})

  const Mymodel = mongoose.model("coachs", coachsSchema)
 

  coachsModel.ValidarCodigo = function (post,callback){
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

coachsModel.Guardar = function(post, callback){
    const instancia = new Mymodel
    instancia.nombre = post.nombre
    instancia.codigo = post.codigo 
    instancia.imagen = post.imagen

 instancia.save().then((respuesta)=>{
     console.log(respuesta)
     return callback({state:true})
 }).catch((error)=>{
     console.log(error)
     return callback({state:false})
 })
       
 }



coachsModel.Listar = function(post,callback){
   Mymodel.find({},{}).then((respuesta)=>{
         return callback({datos:respuesta})
   })     
}

coachsModel.ListarId = function(post,callback){
    Mymodel.find({_id:post._id},{}).then((respuesta)=>{
          return callback({datos:respuesta})
    })     
 }

coachsModel.Actualizar = function(post, callback){
   Mymodel.findByIdAndUpdate({_id:post._id},
    {
       nombre:post.nombre,
       imagen:post.imagen,

    }
   ).then((respuesta)=>{
     return callback({state:true})
   }).catch((error)=>{
    console.log(error)
   })
   
}

coachsModel.Eliminar =function(post, callback){
   
   Mymodel.deleteOne({_id:post._id}).then((respuesta)=>{
    return callback({state:true})  
   }).catch((error)=>{
    console.log(error)
   })
   
    // datos.splice(post.posicion,1)
}


module.exports.coachsModel = coachsModel