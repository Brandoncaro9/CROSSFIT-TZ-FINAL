

var informanosModel = require("../modelos/informanosModel.js").informanosModel
var informanosController = {}
const config = require("../../config.js").config


informanosController.Guardar = function(request,response){
    var post={
        codigo:request.body.codigo,
        nombres:request.body.nombres,
        apellidos:request.body.apellidos,
        celular:request.body.celular,
        email:request.body.email,
        sede:request.body.sede,
      }
        
      if(post.codigo == undefined || post.codigo == null || post.codigo == ""){
        response.json({state:false, mensaje:"El campo codigo es obligatorio"})
      return false
      }

      if(post.nombres == undefined || post.nombres == null || post.nombres == ""){
        response.json({state:false, mensaje:"El campo nombres es obligatorio"})
      return false
      }

      if(post.apellidos == undefined || post.apellidos == null || post.apellidos == ""){
        response.json({state:false, mensaje:"El campo apellidos es obligatorio"})
      return false
      }

      if(post.celular == undefined || post.celular == null || post.celular == ""){
        response.json({state:false, mensaje:"El campo celular es obligatorio"})
      return false
      }

      if(post.email == undefined || post.email == null || post.email == ""){
        response.json({state:false, mensaje:"El campo email es obligatorio"})
      return false
      }

      if(post.sede == undefined || post.sede == null || post.sede == ""){
        response.json({state:false, mensaje:"El campo sede es obligatorio"})
      return false
      }

      
      
  
      informanosModel.ValidarCodigo(post,function(respuesta){
        if(respuesta.existe == "si"){
          response.json({state:false,mensaje:"El Codigo ya existe, intente con otro"})
        }
        else{
    
          informanosModel.Guardar (post, function(respuesta){
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

informanosController.Listar = function(request, response){
  informanosModel.Listar(null,function(respuesta){
    response.json({state:true,datos:respuesta.datos})
  })
} 

informanosController.ListarId = function(request, response){
 
  var post = {
    _id:request.body._id
  }

  if(post._id == undefined || post._id == null || post._id == ""){
    response.json({state:false, mensaje:"El campo _id es obligatorio"})
  return false
  } 
 
  informanosModel.ListarId(post,function(respuesta){
    response.json({state:true,datos:respuesta.datos})
  })
} 

informanosController.Actualizar = function(request,response){
  var post={
    _id:request.body._id,
    nombres:request.body.nombres,
    apellidos:request.body.apellidos,
    celular:request.body.celular,
    email:request.body.email,
    sede:request.body.sede,
  }
  
  if(post._id == undefined || post._id == null || post._id == ""){
    response.json({state:false, mensaje:"El campo _id es obligatorio"})
  return false
  } 

  if(post.nombres== undefined || post.nombres == null || post.nombres == ""){
    response.json({state:false, mensaje:"El campo nombres es obligatorio"})
  return false
  } 

  if(post.apellidos == undefined || post.apellidos == null || post.apellidos == ""){
    response.json({state:false, mensaje:"El campo apellidos es obligatorio"})
  return false
  }

  if(post.celular == undefined || post.celular == null || post.celular == ""){
    response.json({state:false, mensaje:"El campo celular es obligatorio"})
  return false
  }

  if(post.email == undefined || post.email == null || post.email == ""){
    response.json({state:false, mensaje:"El campo email es obligatorio"})
  return false
  }

  if(post.sede == undefined || post.sede == null || post.sede == ""){
    response.json({state:false, mensaje:"El campo sede es obligatorio"})
  return false
  }


  
  informanosModel.Actualizar(post, function(respuesta){
  response.json({state: true, mensaje:"Elemento actualizado correctamente"}) 
  return false
  })
}

informanosController.Eliminar = function(request,response){
  var post={
    _id:request.body._id,
  }

  if(post._id == undefined || post._id == null || post._id == ""){
    response.json({state:false, mensaje:"El campo _id es obligatorio"})
  return false
  } 

  informanosModel.Eliminar(post,function(respuesta){
     response.json({state: true, mensaje:"Elemento elimando correctamente"}) 
     return false   
  })
       
}



module.exports.informanosController = informanosController