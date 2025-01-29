
var horariosfdsModel={}
const mongoose = require("mongoose")

var Schema = mongoose.Schema

var horariosfdsSchema = new Schema({
   codigo:String,
   horafds:String,
   sabado:String,
   domingo:String,


})

  const Mymodel = mongoose.model("horariosfds", horariosfdsSchema)
 

  horariosfdsModel.ValidarCodigo = function (post,callback){
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

horariosfdsModel.Guardar = function(post, callback){
    const instancia = new Mymodel
    instancia.codigo = post.codigo
    instancia.horafds = post.horafds
    instancia.sabado = post.sabado
    instancia.domingo = post.domingo


 instancia.save().then((respuesta)=>{
     console.log(respuesta)
     return callback({state:true})
 }).catch((error)=>{
     console.log(error)
     return callback({state:false})
 })
       
 }



horariosfdsModel.Listar = function(post,callback){
   Mymodel.find({},{}).then((respuesta)=>{
         return callback({datos:respuesta})
   })     
}

horariosfdsModel.ListarId = function(post,callback){
    Mymodel.find({_id:post._id},{}).then((respuesta)=>{
          return callback({datos:respuesta})
    })     
 }

horariosfdsModel.Actualizar = function(post, callback){
   Mymodel.findByIdAndUpdate({_id:post._id},
    {
       horafds:post.horafds,
       sabado:post.sabado,
       domingo:post.domingo,

    }
   ).then((respuesta)=>{
     return callback({state:true})
   }).catch((error)=>{
    console.log(error)
   })
   
}

horariosfdsModel.Eliminar =function(post, callback){
   
   Mymodel.deleteOne({_id:post._id}).then((respuesta)=>{
    return callback({state:true})  
   }).catch((error)=>{
    console.log(error)
   })
   
    // datos.splice(post.posicion,1)
}


module.exports.horariosfdsModel = horariosfdsModel