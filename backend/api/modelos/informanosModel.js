
var informanosModel={}
const mongoose = require("mongoose")

var Schema = mongoose.Schema

var informanosSchema = new Schema({
   codigo:String,
   nombres:String,
   apellidos:String,
   celular:String,
   email:String,
   sede:String,

})

  const Mymodel = mongoose.model("informanos", informanosSchema)
 

  informanosModel.ValidarCodigo = function (post,callback){
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

informanosModel.Guardar = function(post, callback){
    const instancia = new Mymodel
    instancia.codigo = post.codigo
    instancia.nombres = post.nombres 
    instancia.apellidos = post.apellidos
    instancia.celular = post.celular
    instancia.email = post.email
    instancia.sede = post.sede

 instancia.save().then((respuesta)=>{
     console.log(respuesta)
     return callback({state:true})
 }).catch((error)=>{
     console.log(error)
     return callback({state:false})
 })
       
 }



informanosModel.Listar = function(post,callback){
   Mymodel.find({},{}).then((respuesta)=>{
         return callback({datos:respuesta})
   })     
}

informanosModel.ListarId = function(post,callback){
    Mymodel.find({_id:post._id},{}).then((respuesta)=>{
          return callback({datos:respuesta})
    })     
 }

informanosModel.Actualizar = function(post, callback){
   Mymodel.findByIdAndUpdate({_id:post._id},
    {
       nombres:post.nombres,
       apellidos:post.apellidos,
       celular:post.celular,
       email:post.email,
       sede:post.sede,

    }
   ).then((respuesta)=>{
     return callback({state:true})
   }).catch((error)=>{
    console.log(error)
   })
   
}

informanosModel.Eliminar =function(post, callback){
   
   Mymodel.deleteOne({_id:post._id}).then((respuesta)=>{
    return callback({state:true})  
   }).catch((error)=>{
    console.log(error)
   })
   
    // datos.splice(post.posicion,1)
}


module.exports.informanosModel = informanosModel