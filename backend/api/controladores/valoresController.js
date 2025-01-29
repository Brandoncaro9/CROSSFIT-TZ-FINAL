
var valoresModel = require("../modelos/valoresModel.js").valoresModel
var valoresController = {}
const config = require("../../config.js").config


valoresController.Guardar = function(request,response){
    var post={
        codigo:request.body.codigo,
        proposito:request.body.proposito,
        mision:request.body.mision,
        vision:request.body.vision,

      }
    
    
      if(post.codigo == undefined || post.codigo == null || post.codigo == ""){
        response.json({state:false, mensaje:"El campo codigo es obligatorio"})
      return false
      }

      if(post.proposito == undefined || post.proposito == null || post.proposito == ""){
        response.json({state:false, mensaje:"El campo proposito es obligatorio"})
      return false
      }

      if(post.mision == undefined || post.mision == null || post.mision == ""){
        response.json({state:false, mensaje:"El campo mision es obligatorio"})
      return false
      }

      if(post.vision == undefined || post.vision == null || post.vision == ""){
        response.json({state:false, mensaje:"El campo vision es obligatorio"})
      return false
      }


      
      
  
      valoresModel.ValidarCodigo(post,function(respuesta){
        if(respuesta.existe == "si"){
          response.json({state:false,mensaje:"El Codigo ya existe, intente con otro"})
        }
        else{
    
          valoresModel.Guardar (post, function(respuesta){
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

valoresController.Listar = function(request, response){
  valoresModel.Listar(null,function(respuesta){
    response.json({state:true,datos:respuesta.datos})
  })
} 

valoresController.ListarId = function(request, response){
 
  var post = {
    _id:request.body._id
  }

  if(post._id == undefined || post._id == null || post._id == ""){
    response.json({state:false, mensaje:"El campo _id es obligatorio"})
  return false
  } 
 
  valoresModel.ListarId(post,function(respuesta){
    response.json({state:true,datos:respuesta.datos})
  })
} 

valoresController.Actualizar = function(request,response){
  var post={
    _id:request.body._id,
    proposito:request.body.proposito,
    vision:request.body.vision,
    mision:request.body.mision,
  }
  
  if(post._id == undefined || post._id == null || post._id == ""){
    response.json({state:false, mensaje:"El campo _id es obligatorio"})
  return false
  } 

  if(post.proposito== undefined || post.proposito == null || post.proposito == ""){
    response.json({state:false, mensaje:"El campo proposito es obligatorio"})
  return false
  } 

  if(post.mision == undefined || post.mision == null || post.mision == ""){
    response.json({state:false, mensaje:"El campo mision es obligatorio"})
  return false
  }

  if(post.vision == undefined || post.vision == null || post.vision == ""){
    response.json({state:false, mensaje:"El campo vision es obligatorio"})
  return false
  }

  
  
  valoresModel.Actualizar(post, function(respuesta){
  response.json({state: true, mensaje:"Elemento actualizado correctamente"}) 
  return false
  })
}

valoresController.Eliminar = function(request,response){
  var post={
    _id:request.body._id,
  }

  if(post._id == undefined || post._id == null || post._id == ""){
    response.json({state:false, mensaje:"El campo _id es obligatorio"})
  return false
  } 

  valoresModel.Eliminar(post,function(respuesta){
     response.json({state: true, mensaje:"Elemento elimando correctamente"}) 
     return false   
  })
       
}



module.exports.valoresController = valoresController