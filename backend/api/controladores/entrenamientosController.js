
var entrenamientosModel = require("../modelos/entrenamientosModel.js").entrenamientosModel
var entrenamientosController = {}
const config = require("../../config.js").config


entrenamientosController.Guardar = function(request,response){
    var post={
        nombre:request.body.nombre,
        codigo:request.body.codigo,

      }
    
      if(post.nombre == undefined || post.nombre == null || post.nombre == ""){
        response.json({state:false, mensaje:"El campo nombre es obligatorio"})
      return false
      } 
    
      if(post.codigo == undefined || post.codigo == null || post.codigo == ""){
        response.json({state:false, mensaje:"El campo codigo es obligatorio"})
      return false
      }
      
      
  
      entrenamientosModel.ValidarCodigo(post,function(respuesta){
        if(respuesta.existe == "si"){
          response.json({state:false,mensaje:"El Codigo ya existe, intente con otro"})
        }
        else{
    
          entrenamientosModel.Guardar (post, function(respuesta){
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

entrenamientosController.Listar = function(request, response){
  entrenamientosModel.Listar(null,function(respuesta){
    response.json({state:true,datos:respuesta.datos})
  })
} 

entrenamientosController.ListarId = function(request, response){
 
  var post = {
    _id:request.body._id
  }

  if(post._id == undefined || post._id == null || post._id == ""){
    response.json({state:false, mensaje:"El campo _id es obligatorio"})
  return false
  } 
 
  entrenamientosModel.ListarId(post,function(respuesta){
    response.json({state:true,datos:respuesta.datos})
  })
} 

entrenamientosController.Actualizar = function(request,response){
  var post={
    _id:request.body._id,
    identificacion:request.body.identificacion,
    nombre:request.body.nombre,
  }
  
  if(post._id == undefined || post._id == null || post._id == ""){
    response.json({state:false, mensaje:"El campo _id es obligatorio"})
  return false
  } 

  if(post.nombre== undefined || post.nombre == null || post.nombre == ""){
    response.json({state:false, mensaje:"El campo nombre es obligatorio"})
  return false
  } 

  
  entrenamientosModel.Actualizar(post, function(respuesta){
  response.json({state: true, mensaje:"Elemento actualizado correctamente"}) 
  return false
  })
}

entrenamientosController.Eliminar = function(request,response){
  var post={
    _id:request.body._id,
  }

  if(post._id == undefined || post._id == null || post._id == ""){
    response.json({state:false, mensaje:"El campo _id es obligatorio"})
  return false
  } 

  entrenamientosModel.Eliminar(post,function(respuesta){
     response.json({state: true, mensaje:"Elemento elimando correctamente"}) 
     return false   
  })
       
}



module.exports.entrenamientosController = entrenamientosController