
var mensualidadesModel = require("../modelos/mensualidadesModel.js").mensualidadesModel
var mensualidadesController = {}
const config = require("../../config.js").config


mensualidadesController.Guardar = function(request,response){
    var post={
        codigo:request.body.codigo,
        plan:request.body.plan,
        castilla:request.body.castilla,
        bosquepopular:request.body.bosquepopular,
        villemar:request.body.villemar,

      }
        
      if(post.codigo == undefined || post.codigo == null || post.codigo == ""){
        response.json({state:false, mensaje:"El campo codigo es obligatorio"})
      return false
      }

      if(post.plan == undefined || post.plan == null || post.plan == ""){
        response.json({state:false, mensaje:"El campo plan es obligatorio"})
      return false
      }

      if(post.castilla == undefined || post.castilla == null || post.castilla == ""){
        response.json({state:false, mensaje:"El campo castilla es obligatorio"})
      return false
      }

      if(post.bosquepopular == undefined || post.bosquepopular == null || post.bosquepopular == ""){
        response.json({state:false, mensaje:"El campo bosquepopular es obligatorio"})
      return false
      }

      if(post.villemar == undefined || post.villemar == null || post.villemar == ""){
        response.json({state:false, mensaje:"El campo villemar es obligatorio"})
      return false
      }

      
      
  
      mensualidadesModel.ValidarCodigo(post,function(respuesta){
        if(respuesta.existe == "si"){
          response.json({state:false,mensaje:"El Codigo ya existe, intente con otro"})
        }
        else{
    
          mensualidadesModel.Guardar (post, function(respuesta){
               if(respuesta.state == true){
                  response.json({state:true,mensaje:"Elemento guardado correctamente"})
  
                }
               else{
                response.json({state:false,mensaje:"Se presento un error al almacenar "})
               }
          })  
        }
  
      })
  
}

mensualidadesController.Listar = function(request, response){
  mensualidadesModel.Listar(null,function(respuesta){
    response.json({state:true,datos:respuesta.datos})
  })
} 

mensualidadesController.ListarId = function(request, response){
 
  var post = {
    _id:request.body._id
  }

  if(post._id == undefined || post._id == null || post._id == ""){
    response.json({state:false, mensaje:"El campo _id es obligatorio"})
  return false
  } 
 
  mensualidadesModel.ListarId(post,function(respuesta){
    response.json({state:true,datos:respuesta.datos})
  })
} 

mensualidadesController.Actualizar = function(request,response){
  var post={
    _id:request.body._id,
    plan:request.body.plan,
    castilla:request.body.castilla,
    bosquepopular:request.body.bosquepopular,
    villemar:request.body.villemar,

  }
  
  if(post._id == undefined || post._id == null || post._id == ""){
    response.json({state:false, mensaje:"El campo _id es obligatorio"})
  return false
  } 

  if(post.plan== undefined || post.plan == null || post.plan == ""){
    response.json({state:false, mensaje:"El campo plan es obligatorio"})
  return false
  } 

  if(post.castilla == undefined || post.castilla == null || post.castilla == ""){
    response.json({state:false, mensaje:"El campo castilla es obligatorio"})
  return false
  }

  if(post.bosquepopular == undefined || post.bosquepopular == null || post.bosquepopular == ""){
    response.json({state:false, mensaje:"El campo bosquepopular es obligatorio"})
  return false
  }

  if(post.villemar == undefined || post.villemar == null || post.villemar == ""){
    response.json({state:false, mensaje:"El campo villemar es obligatorio"})
  return false
  }

  
  mensualidadesModel.Actualizar(post, function(respuesta){
  response.json({state: true, mensaje:"Elemento actualizado correctamente"}) 
  return false
  })
}

mensualidadesController.Eliminar = function(request,response){
  var post={
    _id:request.body._id,
  }

  if(post._id == undefined || post._id == null || post._id == ""){
    response.json({state:false, mensaje:"El campo _id es obligatorio"})
  return false
  } 

  mensualidadesModel.Eliminar(post,function(respuesta){
     response.json({state: true, mensaje:"Elemento elimando correctamente"}) 
     return false   
  })
       
}



module.exports.mensualidadesController = mensualidadesController