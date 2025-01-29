
var valoresModel={}
const mongoose = require("mongoose")

var Schema = mongoose.Schema

var valoresSchema = new Schema({
   codigo:String,
   proposito:String,
   mision:String,
   vision:String,
})

  const Mymodel = mongoose.model("valores", valoresSchema)
 

  valoresModel.ValidarCodigo = function (post,callback){
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

valoresModel.Guardar = function(post, callback){
    const instancia = new Mymodel
    instancia.codigo = post.codigo 
    instancia.proposito = post.proposito
    instancia.mision = post.mision
    instancia.vision = post.vision

 instancia.save().then((respuesta)=>{
     console.log(respuesta)
     return callback({state:true})
 }).catch((error)=>{
     console.log(error)
     return callback({state:false})
 })
       
 }



valoresModel.Listar = function(post,callback){
   Mymodel.find({},{}).then((respuesta)=>{
         return callback({datos:respuesta})
   })     
}

valoresModel.ListarId = function(post,callback){
    Mymodel.find({_id:post._id},{}).then((respuesta)=>{
          return callback({datos:respuesta})
    })     
 }

valoresModel.Actualizar = function(post, callback){
   Mymodel.findByIdAndUpdate({_id:post._id},
    {
       proposito:post.proposito,
       mision:post.mision,
       vision:post.vision,

    }
   ).then((respuesta)=>{
     return callback({state:true})
   }).catch((error)=>{
    console.log(error)
   })
   
}

valoresModel.Eliminar =function(post, callback){
   
   Mymodel.deleteOne({_id:post._id}).then((respuesta)=>{
    return callback({state:true})  
   }).catch((error)=>{
    console.log(error)
   })
   
    // datos.splice(post.posicion,1)
}


module.exports.valoresModel = valoresModel