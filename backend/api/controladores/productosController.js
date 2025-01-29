
var productosModel = require("../modelos/productosModel.js").productosModel
var productosController = {}
const config = require("../../config.js").config


productosController.Guardar = function(request,response){
    var post={
        nombre:request.body.nombre,
        codigo:request.body.codigo,
        descripcion:request.body.descripcion,
        cantidad:request.body.cantidad,
        estado:request.body.estado,
        precio:request.body.precio,
        talla:request.body.talla,

      }
    
      if(post.nombre == undefined || post.nombre == null || post.nombre == ""){
        response.json({state:false, mensaje:"El campo nombre es obligatorio"})
      return false
      } 
    
      if(post.codigo == undefined || post.codigo == null || post.codigo == ""){
        response.json({state:false, mensaje:"El campo codigo es obligatorio"})
      return false
      }

      if(post.descripcion == undefined || post.descripcion == null || post.descripcion == ""){
        response.json({state:false, mensaje:"El campo descripcion es obligatorio"})
      return false
      }

      if(post.cantidad == undefined || post.cantidad == null || post.cantidad == ""){
        response.json({state:false, mensaje:"El campo cantidad es obligatorio"})
      return false
      }

      if(post.estado == undefined || post.estado == null || post.estado == ""){
        response.json({state:false, mensaje:"El campo estado es obligatorio"})
      return false
      }

      if(post.precio == undefined || post.precio == null || post.precio == ""){
        response.json({state:false, mensaje:"El campo precio es obligatorio"})
      return false
      }

      if(post.talla == undefined || post.talla == null || post.talla == ""){
        response.json({state:false, mensaje:"El campo talla es obligatorio"})
      return false
      }
      
      
  
      productosModel.ValidarCodigo(post,function(respuesta){
        if(respuesta.existe == "si"){
          response.json({state:false,mensaje:"El Codigo ya existe, intente con otro"})
        }
        else{
    
          productosModel.Guardar (post, function(respuesta){
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

productosController.Listar = function(request, response){
  productosModel.Listar(null,function(respuesta){
    response.json({state:true,datos:respuesta.datos})
  })
} 

productosController.ListarId = function(request, response){
 
  var post = {
    _id:request.body._id
  }

  if(post._id == undefined || post._id == null || post._id == ""){
    response.json({state:false, mensaje:"El campo _id es obligatorio"})
  return false
  } 
 
  productosModel.ListarId(post,function(respuesta){
    response.json({state:true,datos:respuesta.datos})
  })
} 

productosController.Actualizar = function(request,response){
  var post={
    _id:request.body._id,
    identificacion:request.body.identificacion,
    nombre:request.body.nombre,
    descripcion:request.body.descripcion,
    cantidad:request.body.cantidad,
    estado:request.body.estado,
    precio:request.body.precio,
    talla:request.body.talla,
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

  if(post.descripcion == undefined || post.descripcion == null || post.descripcion == ""){
    response.json({state:false, mensaje:"El campo descripcion es obligatorio"})
  return false
  }

  if(post.cantidad == undefined || post.cantidad == null || post.cantidad == ""){
    response.json({state:false, mensaje:"El campo cantidad es obligatorio"})
  return false
  }

  if(post.estado == undefined || post.estado == null || post.estado == ""){
    response.json({state:false, mensaje:"El campo estado es obligatorio"})
  return false
  }

  if(post.precio == undefined || post.precio == null || post.precio == ""){
    response.json({state:false, mensaje:"El campo precio es obligatorio"})
  return false
  }

  if(post.talla == undefined || post.talla == null || post.talla == ""){
    response.json({state:false, mensaje:"El campo talla es obligatorio"})
  return false
  }

  if(post.imagen == undefined || post.imagen == null || post.imagen == ""){
    response.json({state:false, mensaje:"El campo imagen es obligatorio"})
  return false
  }
  
  productosModel.Actualizar(post, function(respuesta){
  response.json({state: true, mensaje:"Elemento actualizado correctamente"}) 
  return false
  })
}

productosController.Eliminar = function(request,response){
  var post={
    _id:request.body._id,
  }

  if(post._id == undefined || post._id == null || post._id == ""){
    response.json({state:false, mensaje:"El campo _id es obligatorio"})
  return false
  } 

  productosModel.Eliminar(post,function(respuesta){
     response.json({state: true, mensaje:"Elemento elimando correctamente"}) 
     return false   
  })
       
}



module.exports.productosController = productosController