
var horariosfdsModel = require("../modelos/horariosfdsModel.js").horariosfdsModel
var horariosfdsController = {}
const config = require("../../config.js").config


horariosfdsController.Guardar = function(request,response){
    var post={
        codigo:request.body.codigo,
        horafds:request.body.horafds,
        sabado:request.body.sabado,
        domingo:request.body.domingo,

      }
        
      if(post.codigo == undefined || post.codigo == null || post.codigo == ""){
        response.json({state:false, mensaje:"El campo codigo es obligatorio"})
      return false
      }

      if(post.horafds == undefined || post.horafds == null || post.horafds == ""){
        response.json({state:false, mensaje:"El campo hora es obligatorio"})
      return false
      }

      if(post.sabado == undefined || post.sabado == null || post.sabado == ""){
        response.json({state:false, mensaje:"El campo sabado es obligatorio"})
      return false
      }

      if(post.domingo == undefined || post.domingo == null || post.domingo == ""){
        response.json({state:false, mensaje:"El campo domingo es obligatorio"})
      return false
      }
     
      
  
      horariosfdsModel.ValidarCodigo(post,function(respuesta){
        if(respuesta.existe == "si"){
          response.json({state:false,mensaje:"El Codigo ya existe, intente con otro"})
        }
        else{
    
          horariosfdsModel.Guardar (post, function(respuesta){
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

horariosfdsController.Listar = function(request, response){
  horariosfdsModel.Listar(null,function(respuesta){
    response.json({state:true,datos:respuesta.datos})
  })
} 

horariosfdsController.ListarId = function(request, response){
 
  var post = {
    _id:request.body._id
  }

  if(post._id == undefined || post._id == null || post._id == ""){
    response.json({state:false, mensaje:"El campo _id es obligatorio"})
  return false
  } 
 
  horariosfdsModel.ListarId(post,function(respuesta){
    response.json({state:true,datos:respuesta.datos})
  })
} 

horariosfdsController.Actualizar = function(request,response){
  var post={
    _id:request.body._id,
    horafds:request.body.horafds,
    sabado:request.body.sabado,
    domingo:request.body.domingo,

  }
  
  if(post._id == undefined || post._id == null || post._id == ""){
    response.json({state:false, mensaje:"El campo _id es obligatorio"})
  return false
  } 

  if(post.horafds== undefined || post.horafds == null || post.horafds == ""){
    response.json({state:false, mensaje:"El campo hora es obligatorio"})
  return false
  } 

  if(post.sabado == undefined || post.sabado == null || post.sabado == ""){
    response.json({state:false, mensaje:"El campo sabado es obligatorio"})
  return false
  }

  if(post.domingo == undefined || post.domingo == null || post.domingo == ""){
    response.json({state:false, mensaje:"El campo domingo es obligatorio"})
  return false
  }


  
  horariosfdsModel.Actualizar(post, function(respuesta){
  response.json({state: true, mensaje:"Elemento actualizado correctamente"}) 
  return false
  })
}

horariosfdsController.Eliminar = function(request,response){
  var post={
    _id:request.body._id,
  }

  if(post._id == undefined || post._id == null || post._id == ""){
    response.json({state:false, mensaje:"El campo _id es obligatorio"})
  return false
  } 

  horariosfdsModel.Eliminar(post,function(respuesta){
     response.json({state: true, mensaje:"Elemento elimando correctamente"}) 
     return false   
  })
       
}



module.exports.horariosfdsController = horariosfdsController