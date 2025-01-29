
var horarioslvModel = require("../modelos/horarioslvModel.js").horarioslvModel
var horarioslvController = {}
const config = require("../../config.js").config


horarioslvController.Guardar = function(request,response){
    var post={
        codigo:request.body.codigo,
        hora:request.body.hora,
        lunes:request.body.lunes,
        martes:request.body.martes,
        miercoles:request.body.miercoles,
        jueves:request.body.jueves,
        viernes:request.body.viernes,

      }
        
      if(post.codigo == undefined || post.codigo == null || post.codigo == ""){
        response.json({state:false, mensaje:"El campo codigo es obligatorio"})
      return false
      }

      if(post.hora == undefined || post.hora == null || post.hora == ""){
        response.json({state:false, mensaje:"El campo hora es obligatorio"})
      return false
      }

      if(post.lunes == undefined || post.lunes == null || post.lunes == ""){
        response.json({state:false, mensaje:"El campo lunes es obligatorio"})
      return false
      }

      if(post.martes == undefined || post.martes == null || post.martes == ""){
        response.json({state:false, mensaje:"El campo martes es obligatorio"})
      return false
      }

      if(post.miercoles == undefined || post.miercoles == null || post.miercoles == ""){
        response.json({state:false, mensaje:"El campo miercoles es obligatorio"})
      return false
      }

      if(post.jueves == undefined || post.jueves == null || post.jueves == ""){
        response.json({state:false, mensaje:"El campo jueves es obligatorio"})
      return false
      }

      if(post.viernes == undefined || post.viernes == null || post.viernes == ""){
        response.json({state:false, mensaje:"El campo viernes es obligatorio"})
      return false
      }

      
      
  
      horarioslvModel.ValidarCodigo(post,function(respuesta){
        if(respuesta.existe == "si"){
          response.json({state:false,mensaje:"El Codigo ya existe, intente con otro"})
        }
        else{
    
          horarioslvModel.Guardar (post, function(respuesta){
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

horarioslvController.Listar = function(request, response){
  horarioslvModel.Listar(null,function(respuesta){
    response.json({state:true,datos:respuesta.datos})
  })
} 

horarioslvController.ListarId = function(request, response){
 
  var post = {
    _id:request.body._id
  }

  if(post._id == undefined || post._id == null || post._id == ""){
    response.json({state:false, mensaje:"El campo _id es obligatorio"})
  return false
  } 
 
  horarioslvModel.ListarId(post,function(respuesta){
    response.json({state:true,datos:respuesta.datos})
  })
} 

horarioslvController.Actualizar = function(request,response){
  var post={
    _id:request.body._id,
    hora:request.body.hora,
    lunes:request.body.lunes,
    martes:request.body.martes,
    miercoles:request.body.miercoles,
    jueves:request.body.jueves,
    viernes:request.body.viernes,

  }
  
  if(post._id == undefined || post._id == null || post._id == ""){
    response.json({state:false, mensaje:"El campo _id es obligatorio"})
  return false
  } 

  if(post.hora== undefined || post.hora == null || post.hora == ""){
    response.json({state:false, mensaje:"El campo hora es obligatorio"})
  return false
  } 

  if(post.lunes == undefined || post.lunes == null || post.lunes == ""){
    response.json({state:false, mensaje:"El campo lunes es obligatorio"})
  return false
  }

  if(post.martes == undefined || post.martes == null || post.martes == ""){
    response.json({state:false, mensaje:"El campo martes es obligatorio"})
  return false
  }

  if(post.miercoles == undefined || post.miercoles == null || post.miercoles == ""){
    response.json({state:false, mensaje:"El campo miercoles es obligatorio"})
  return false
  }

  if(post.jueves == undefined || post.jueves == null || post.jueves == ""){
    response.json({state:false, mensaje:"El campo jueves es obligatorio"})
  return false
  }

  if(post.viernes == undefined || post.viernes == null || post.viernes == ""){
    response.json({state:false, mensaje:"El campo viernes es obligatorio"})
  return false
  }

  
  horarioslvModel.Actualizar(post, function(respuesta){
  response.json({state: true, mensaje:"Elemento actualizado correctamente"}) 
  return false
  })
}

horarioslvController.Eliminar = function(request,response){
  var post={
    _id:request.body._id,
  }

  if(post._id == undefined || post._id == null || post._id == ""){
    response.json({state:false, mensaje:"El campo _id es obligatorio"})
  return false
  } 

  horarioslvModel.Eliminar(post,function(respuesta){
     response.json({state: true, mensaje:"Elemento elimando correctamente"}) 
     return false   
  })
       
}



module.exports.horarioslvController = horarioslvController