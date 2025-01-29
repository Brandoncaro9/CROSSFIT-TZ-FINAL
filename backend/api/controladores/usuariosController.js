
var usuariosModel = require("../modelos/usuariosModel.js").usuariosModel
var usuariosController = {}
const config = require("../../config.js").config
const nodemailer = require("nodemailer")

function calcularTiempoTranscurrido(fechaInicial) {
  const fechaInicio = new Date(fechaInicial);
  const fechaActual = new Date();

  // Validar la fecha inicial
  if (isNaN(fechaInicio.getTime())) {
      return "La fecha proporcionada no es válida.";
  }

  // Calcular la diferencia en milisegundos
  let diferenciaMs = fechaActual - fechaInicio;
  // Formatear el resultado
  return Math.ceil((diferenciaMs/1000)/60)
}

usuariosController.Login = function(request,response){
  var post = {
    email:request.body.email,
    password:request.body.password
  }
  
  if(post.email == undefined || post.email == null || post.email == ""){
    response.json({state:false, mensaje:"El campo email es obligatorio"})
  return false
  } 
  
  if(post.password == undefined || post.password == null || post.password == ""){
    response.json({state:false, mensaje:"El campo password es obligatorio"})
  return false
  }
  
  post.password = SHA256(post.password + config.secret)

  usuariosModel.ValidarActivo(post,function(respuesta){
    if(respuesta.state == false){
      response.json(respuesta)
    }
    else{
      if(respuesta.estado == 0){
        response.json({estate:true, mensaje:"Por favor Activar Cuenta"})
      }
      else{
        usuariosModel.Login(post, function(respuesta){
          request.session._id = respuesta._id
          request.session.nombre = respuesta.nombre
          request.session.rol = respuesta.rol
          
          response.json(respuesta)
       })
      }
    }
  })



}

usuariosController.Registrar = function(request,response){
    var post={
        nombre:request.body.nombre,
        email:request.body.email,
        telefono:request.body.telefono,
        password:request.body.password,
      }
    
      if(post.nombre == undefined || post.nombre == null || post.nombre == ""){
        response.json({state:false, mensaje:"El campo nombre es obligatorio"})
      return false
      } 
    
      if(post.email == undefined || post.email == null || post.email == ""){
        response.json({state:false, mensaje:"El campo email es obligatorio"})
      return false
      }
    
      if(post.telefono== undefined || post.telefono == null || post.telefono == ""){
        response.json({state:false, mensaje:"El campo telefono no puede venir vacio"})
      return false
      }
    
      if(post.password == undefined || post.password == null || post.password == ""){
        response.json({state:false, mensaje:"El campo password es obligatorio"})
      return false
      }

      post.password = SHA256(post.password + config.secret)
      
      

      usuariosModel.ValidarEmail(post,function(respuesta){
        if(respuesta.existe == "si"){
          response.json({state:false,mensaje:"El Email ya existe, intente con otra"})
        }
        else{

          var azar = "B-" + Math.ceil(Math.random() * (9999 - 1000) + 1000)
          post.codigo = azar

          usuariosModel.Registrar (post, function(respuesta){
               if(respuesta.state == true){
                  response.json({state:true,mensaje:"Usuario guardado correctamente, verifique su bandeja de entrada"})
                  //enviar:correo
                  
                  
                  const transporter = nodemailer.createTransport({
                     host:config.email.host,
                     port:config.email.port,
                     secure:false,
                     requireTLS:true,
                     auth:{
                         user:config.email.user,
                         pass:config.email.pass
                     }

                  })

                  var mailOptions = {
                      from:config.email.user,
                      to:post.email,
                      subject:"Verifica tu cuenta con el Codigo" + azar,
                      html:`<div style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; height: 100vh;">

    <div style="background-color: #ffffff; padding: 20px 40px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); width: 100%; max-width: 500px;">
        <h1 style="color: #4CAF50; text-align: center;">¡Bienvenido a tu cuenta!</h1>
        <p style="text-align: center; color: #555; font-size: 16px;">Para completar la activación de tu cuenta, ingresa el siguiente código en la página de activación:</p>

        <div style="background-color: #f1f1f1; padding: 15px; text-align: center; font-size: 60px; font-weight: bold; border-radius: 5px; color: #333;">
            <p style="margin: 0;">Código de Activación: <span style="color: #FF5722;">${azar}</span></p>
        </div>

        <p style="text-align: center; margin-top: 20px; color: #888; font-size: 14px;">
            Si no solicitaste esta activación, por favor ignora este mensaje.
        </p>

        <div style="text-align: center; margin-top: 20px;">
            <a href="${config.urlReal}/activar/${post.email}/${azar}" style="background-color: #4CAF50; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-size: 16px; cursor: pointer; transition: background-color 0.3s;">Activar cuenta</a>
        </div>
    </div>

</div>`
                  }
                  
                  transporter.sendMail(mailOptions,(error, info) =>{
                    if(error){
                      console.log(error)
                    }
                    else{
                      console.log(info)
                    }


                  })



                }
               else{
                response.json({state:false,mensaje:"Se presento un error al almacenar "})
               }
          })  
        }

      })

}

usuariosController.Listar = function(request, response){
  usuariosModel.Listar(null,function(respuesta){
    response.json({state:true,datos:respuesta.datos})
  })
} 

usuariosController.ListarId = function(request, response){
 
  var post = {
    _id:request.body._id
  }

  if(post._id == undefined || post._id == null || post._id == ""){
    response.json({state:false, mensaje:"El campo _id es obligatorio"})
  return false
  } 
 
  usuariosModel.ListarId(post,function(respuesta){
    response.json({state:true,datos:respuesta.datos})
  })
} 

usuariosController.Actualizar = function(request,response){
  var post={
    _id:request.body._id,
    identificacion:request.body.identificacion,
    nombre:request.body.nombre,
    telefono:request.body.telefono,
    rol:request.body.rol,
    estado:request.body.estado
  }
  
  if(post._id == undefined || post._id == null || post._id == ""){
    response.json({state:false, mensaje:"El campo _id es obligatorio"})
  return false
  } 

  if(post.nombre== undefined || post.nombre == null || post.nombre == ""){
    response.json({state:false, mensaje:"El campo nombre es obligatorio"})
  return false
  } 

  if(post.telefono== undefined || post.telefono == null || post.telefono == ""){
    response.json({state:false, mensaje:"El campo telefono es obligatorio"})
  return false
  } 
  
  if(post.rol== undefined || post.rol == null || post.rol == ""){
    response.json({state:false, mensaje:"El campo rol es obligatorio"})
  return false
  } 

  if(post.estado== undefined || post.estado == null || post.estado == ""){
    response.json({state:false, mensaje:"El campo estado es obligatorio"})
  return false
  } 
  
  usuariosModel.Actualizar(post, function(respuesta){
  response.json({state: true, mensaje:"Usuario actualizado correctamente"}) 
  return false
  })
}

usuariosController.Eliminar = function(request,response){
  var post={
    _id:request.body._id,
  }

  if(post._id == undefined || post._id == null || post._id == ""){
    response.json({state:false, mensaje:"El campo _id es obligatorio"})
  return false
  } 

  usuariosModel.Eliminar(post,function(respuesta){
     response.json({state: true, mensaje:"Usuario elimando correctamente"}) 
     return false   
  })
       
}

usuariosController.activar = function(request,response){
  var post = {
    email:request.body.email,
    codigo:request.body.codigo
  }
  
  if(post.email == undefined || post.email == null || post.email == ""){
    response.json({state:false, mensaje:"El campo email es obligatorio"})
  return false
  } 

  if(post.codigo == undefined || post.codigo == null || post.codigo == ""){
    response.json({state:false, mensaje:"El campo codigo es obligatorio"})
  return false
  }
  
  usuariosModel.activar(post,function(respuesta){
     response.json(respuesta)
  })


}

usuariosController.solicitarcodigo = function(request, response){
  var post = {
    email:request.body.email 
  }
  if(post.email == undefined || post.email == null || post.email == ""){
    response.json({state:false, mensaje:"El campo email es obligatorio"})
    return false
  }
post.codrec = "R-" + Math.ceil(Math.random() * (9999 - 1000) + 1000)
usuariosModel.Crearcodigo(post, function(respuesta){
          
          if(respuesta.state==false){
            response.json(respuesta)
          }
          else{
            response.json({state:true, mensaje:"Hemos enviado un codigo de recuperación a tu correo electronico"})
          
            const transporter = nodemailer.createTransport({
              host:config.email.host,
              port:config.email.port,
              secure:false,
              requireTLS:true,
              auth:{
                  user:config.email.user,
                  pass:config.email.pass
              }
    
              })
    
              var mailOptions = {
                from:config.email.user,
                to:post.email,
                subject:"Recuperar tu password" + post.codrec,
                html:`<div style="font-family: Arial, sans-serif; background-color: #f4f4f9; margin: 0; padding: 0; color: #333;">
                    <div style="max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                        <header style="background: #007bff; color: #ffffff; text-align: center; padding: 15px;">
                            <h1 style="margin: 0; font-size: 24px;">Recuperación de Contraseña</h1>
                        </header>
                        <main style="padding: 20px;">
                            <p>Hola,</p>
                            <p>Hemos recibido una solicitud para recuperar tu contraseña. Usa el siguiente código para completar el proceso:</p>
                            <div style="text-align: center; margin: 20px 0;">
                                <span style="display: inline-block; font-size: 24px; font-weight: bold; color: #007bff; border: 1px dashed #007bff; padding: 10px 20px; border-radius: 4px;">
                                    ${post.codrec}
                                </span>
                            </div>
                            <p>Si no solicitaste este cambio, puedes ignorar este mensaje.</p>
                            <p style="margin-top: 20px;">Atentamente,<br>El equipo de Soporte</p>
                        </main>
                        <footer style="background: #f4f4f9; color: #777; text-align: center; padding: 10px; font-size: 12px;">
                            <p>Este es un mensaje automático. Por favor, no respondas a este correo.</p>
                        </footer>
                    </div>
                </div>`
              }
    
              transporter.sendMail(mailOptions,(error, info) =>{
              if(error){
                console.log(error)
              }
              else{
                console.log(info)
              }
    
    
          })
          
          }

          

    })


 }

usuariosController.recuperarpass = function(request, response){
    var post = {
       email:request.body.email,
       codrec:request.body.codrec,
       password:request.body.password,
       confirmacion:request.body.confirmacion
    }

    if(post.email == undefined || post.email == null || post.email == ""){
      response.json({state:false, mensaje:"El campo email es obligatorio"})
      return false
    }

    if(post.codrec == undefined || post.codrec == null || post.codrec == ""){
      response.json({state:false, mensaje:"El campo codrec es obligatorio"})
      return false
    }

    if(post.password == undefined || post.password == null || post.password == ""){
      response.json({state:false, mensaje:"El campo password es obligatorio"})
      return false
    }

    if(post.confirmacion == undefined || post.confirmacion == null || post.confirmacion == ""){
      response.json({state:false, mensaje:"El campo confirmacion es obligatorio"})
      return false
    }

    if(post.confirmacion != post.password){
      response.json({state:false, mensaje:"La confirmación y el password no coinciden"})
      return false
    }

    post.password = sha256(post.password + config.secret)

     usuariosModel.expiracion(post, function(exp){
        var minutos = calcularTiempoTranscurrido(exp.datos.fecharec)
        if(minutos >= 1){
          response.json({state:false, mensaje:"Tu codigo ha caducado"})
        }
        else{
          usuariosModel.recuperarpass(post, function(respuesta){
            respuesta.tiempo = minutos
            response.json(respuesta)
          })
        }
          
     })

   


  
  
  
 }

 usuariosController.Guardar = function(request,response){
  var post={
      nombre:request.body.nombre,
      email:request.body.email,
      telefono:request.body.telefono,
      password:request.body.password,
    }
  
    if(post.nombre == undefined || post.nombre == null || post.nombre == ""){
      response.json({state:false, mensaje:"El campo nombre es obligatorio"})
    return false
    } 
  
    if(post.email == undefined || post.email == null || post.email == ""){
      response.json({state:false, mensaje:"El campo email es obligatorio"})
    return false
    }
  
    if(post.telefono== undefined || post.telefono == null || post.telefono == ""){
      response.json({state:false, mensaje:"El campo telefono no puede venir vacio"})
    return false
    }
  
    if(post.password == undefined || post.password == null || post.password == ""){
      response.json({state:false, mensaje:"El campo password es obligatorio"})
    return false
    }

    post.password = SHA256(post.password + config.secret)
    
    

    usuariosModel.ValidarEmail(post,function(respuesta){
      if(respuesta.existe == "si"){
        response.json({state:false,mensaje:"El Email ya existe, intente con otra"})
      }
      else{

        var azar = "B-" + Math.ceil(Math.random() * (9999 - 1000) + 1000)
        post.codigo = azar

        usuariosModel.Guardar (post, function(respuesta){
             if(respuesta.state == true){
                response.json({state:true,mensaje:"Usuario guardado correctamente"})

              }
             else{
              response.json({state:false,mensaje:"Se presento un error al almacenar "})
             }
        })  
      }

    })

}

module.exports.usuariosController = usuariosController