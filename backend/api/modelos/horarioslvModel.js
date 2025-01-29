
var horarioslvModel={}
const mongoose = require("mongoose")

var Schema = mongoose.Schema

var horarioslvSchema = new Schema({
   codigo:String,
   hora:String,
   lunes:String,
   martes:String,
   miercoles:String,
   jueves:String,
   viernes:String,

})

  const Mymodel = mongoose.model("horarioslv", horarioslvSchema)
 

  horarioslvModel.ValidarCodigo = function (post,callback){
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

horarioslvModel.Guardar = function(post, callback){
    const instancia = new Mymodel
    instancia.codigo = post.codigo
    instancia.hora = post.hora 
    instancia.lunes = post.lunes
    instancia.martes = post.martes
    instancia.miercoles = post.miercoles
    instancia.jueves = post.jueves
    instancia.viernes = post.viernes

 instancia.save().then((respuesta)=>{
     console.log(respuesta)
     return callback({state:true})
 }).catch((error)=>{
     console.log(error)
     return callback({state:false})
 })
       
 }



horarioslvModel.Listar = function(post,callback){
   Mymodel.find({},{}).then((respuesta)=>{
         return callback({datos:respuesta})
   })     
}

horarioslvModel.ListarId = function(post,callback){
    Mymodel.find({_id:post._id},{}).then((respuesta)=>{
          return callback({datos:respuesta})
    })     
 }

horarioslvModel.Actualizar = function(post, callback){
   Mymodel.findByIdAndUpdate({_id:post._id},
    {
       hora:post.hora,
       lunes:post.lunes,
       martes:post.martes,
       miercoles:post.miercoles,
       jueves:post.jueves,
       viernes:post.viernes,

    }
   ).then((respuesta)=>{
     return callback({state:true})
   }).catch((error)=>{
    console.log(error)
   })
   
}

horarioslvModel.Eliminar =function(post, callback){
   
   Mymodel.deleteOne({_id:post._id}).then((respuesta)=>{
    return callback({state:true})  
   }).catch((error)=>{
    console.log(error)
   })
   
    // datos.splice(post.posicion,1)
}


module.exports.horarioslvModel = horarioslvModel