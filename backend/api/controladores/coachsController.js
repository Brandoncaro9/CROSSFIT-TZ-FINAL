
var coachsModel = require("../modelos/coachsModel.js").coachsModel
var coachsController = {}
const config = require("../../config.js").config


coachsController.Guardar = function(request,response){
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

     
      
      
  
      coachsModel.ValidarCodigo(post,function(respuesta){
        if(respuesta.existe == "si"){
          response.json({state:false,mensaje:"El Codigo ya existe, intente con otro"})
        }
        else{
    
          coachsModel.Guardar (post, function(respuesta){
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

coachsController.Listar = function(request, response){
  coachsModel.Listar(null,function(respuesta){
    response.json({state:true,datos:respuesta.datos})
  })
} 

coachsController.ListarId = function(request, response){
 
  var post = {
    _id:request.body._id
  }

  if(post._id == undefined || post._id == null || post._id == ""){
    response.json({state:false, mensaje:"El campo _id es obligatorio"})
  return false
  } 
 
  coachsModel.ListarId(post,function(respuesta){
    response.json({state:true,datos:respuesta.datos})
  })
} 

coachsController.Actualizar = function(request,response){
  var post={
    _id:request.body._id,
    nombre:request.body.nombre,
    imagen:request.body.imagen,
  }
  
  if(post._id == undefined || post._id == null || post._id == ""){
    response.json({state:false, mensaje:"El campo _id es obligatorio"})
  return false
  } 

  if(post.nombre== undefined || post.nombre == null || post.nombre == ""){
    response.json({state:false, mensaje:"El campo nombre es obligatorio"})
  return false
  } 

  if(post.imagen == undefined || post.imagen == null || post.imagen == ""){
    response.json({state:false, mensaje:"El campo imagen es obligatorio"})
  return false
  }
  
  coachsModel.Actualizar(post, function(respuesta){
  response.json({state: true, mensaje:"Elemento actualizado correctamente"}) 
  return false
  })
}

coachsController.Eliminar = function(request,response){
  var post={
    _id:request.body._id,
  }

  if(post._id == undefined || post._id == null || post._id == ""){
    response.json({state:false, mensaje:"El campo _id es obligatorio"})
  return false
  } 

  coachsModel.Eliminar(post,function(respuesta){
     response.json({state: true, mensaje:"Elemento elimando correctamente"}) 
     return false   
  })
       
}



module.exports.coachsController = coachsController