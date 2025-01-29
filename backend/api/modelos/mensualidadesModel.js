
var mensualidadesModel={}
const mongoose = require("mongoose")

var Schema = mongoose.Schema

var mensualidadesSchema = new Schema({
   codigo:String,
   plan:String,
   castilla:Number,
   bosquepopular:Number,
   villemar:Number,

})

  const Mymodel = mongoose.model("mensualidades", mensualidadesSchema)
 

  mensualidadesModel.ValidarCodigo = function (post,callback){
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

mensualidadesModel.Guardar = function(post, callback){
    const instancia = new Mymodel
    instancia.codigo = post.codigo 
    instancia.plan = post.plan
    instancia.castilla = post.castilla
    instancia.bosquepopular = post.bosquepopular
    instancia.villemar = post.villemar

 instancia.save().then((respuesta)=>{
     console.log(respuesta)
     return callback({state:true})
 }).catch((error)=>{
     console.log(error)
     return callback({state:false})
 })
       
 }



mensualidadesModel.Listar = function(post,callback){
   Mymodel.find({},{}).then((respuesta)=>{
         return callback({datos:respuesta})
   })     
}

mensualidadesModel.ListarId = function(post,callback){
    Mymodel.find({_id:post._id},{}).then((respuesta)=>{
          return callback({datos:respuesta})
    })     
 }

mensualidadesModel.Actualizar = function(post, callback){
   Mymodel.findByIdAndUpdate({_id:post._id},
    {
       plan:post.plan,
       castilla:post.castilla,
       bosquepopular:post.bosquepopular,
       villemar:post.villemar,


    }
   ).then((respuesta)=>{
     return callback({state:true})
   }).catch((error)=>{
    console.log(error)
   })
   
}

mensualidadesModel.Eliminar =function(post, callback){
   
   Mymodel.deleteOne({_id:post._id}).then((respuesta)=>{
    return callback({state:true})  
   }).catch((error)=>{
    console.log(error)
   })
   
    // datos.splice(post.posicion,1)
}


module.exports.mensualidadesModel = mensualidadesModel