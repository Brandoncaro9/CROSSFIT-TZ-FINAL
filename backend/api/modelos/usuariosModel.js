
var usuariosModel={}
const mongoose = require("mongoose")

var Schema = mongoose.Schema

var usuariosSchema = new Schema({
   nombre:String,
   email:String,
   telefono:String,
   password:String,
   rol:String,// Cliente /  Administrador / Vendedor   
   estado:Number,// 1:Activo 0:Inactivo
   codigo:String,
   codrec:String,
   fecharec:Date
})

  const Mymodel = mongoose.model("usuarios", usuariosSchema)

usuariosModel.expiracion = function(post, callback){
    Mymodel.findOne({email:post.email},{fecharec:1}).then((respuesta)=>{
       if(respuesta == null){
          return callback({state:false, mensaje:"el correo no es valido"})
       }
       else{
           return callback({state:true, datos:respuesta})
       }

    })
}

usuariosModel.recuperarpass = function(post,callback){
    Mymodel.findOneAndUpdate({email:post.email,codrec:post.codrec},{password:post.password}).then((respuesta)=>{
        if(respuesta == null){
            return callback({state:false, mensaje:"El codigo de recuperación no es valido"})
        }
        else{
            return callback({state:true, mensaje:"Se recupero el password correctamente"})
        }

    })
}  

usuariosModel.Crearcodigo = function(post, callback){
    Mymodel.findOneAndUpdate({email:post.email}, 
        {
            codrec:post.codrec,
            fecharec: new Date()
        
        }).then((respuesta)=>{
        if(respuesta == null){
            return callback({state:false, mensaje:"Nose pudo crear el codigo de recuperación"})
        }
        else{
            return callback({state:true})
        }
    })
}

  usuariosModel.ValidarEmail = function (post,callback){
    //var posicion = datos.findIndex((item) => item.identificacion == post.identificacion)
    Mymodel.findOne({email:post.email}).then((respuesta)=>{
        if(respuesta == null){
            return callback ({existe:"No"})
        }
        else{
            return callback({existe:"si"})
        }
    })

}

usuariosModel.Login = function(post, callback){
    Mymodel.findOne({email:post.email, password:post.password},{_id:1,nombre:1,rol:1}).then((respuesta)=>{
        if(respuesta == null){
            return callback({state:false, mensaje:"Credenciales Invalidas"})
        }
        else{
            return callback({state:true, mensaje:"Bienvenid@ " + respuesta.nombre, nombre: respuesta.nombre,rol:respuesta.rol,_id:respuesta._id})
        }   
    })
}

usuariosModel.activar = function(post,callback){
    Mymodel.findOneAndUpdate({email:post.email, codigo:post.codigo},{
        estado:1
    }).then((respuesta) =>{
        if(respuesta == null){
            return callback({state:false, mensaje: "No se pudo activar la cuenta"})
        }
        else{
            return callback({state:true, mensaje: "La cuenta fue actividad exitosamente"})

        }
    })
}

usuariosModel.ValidarActivo = function(post, callback){
    Mymodel.findOne({email:post.email},{estado:1}).then((respuesta)=>{
        if(respuesta == null){
            return callback({state:false, mensaje:"El correo no es valido"})
        }
        else{
            return callback({state:true, estado:respuesta.estado})
        }
    })
}

usuariosModel.Registrar = function(post, callback){
   const instancia = new Mymodel
   instancia.nombre = post.nombre
   instancia.email = post.email
   instancia.telefono = post.telefono
   instancia.password = post.password
   instancia.rol = "Cliente"
   instancia.estado = 0 
   instancia.codigo = post.codigo

instancia.save().then((respuesta)=>{
    console.log(respuesta)
    return callback({state:true})
}).catch((error)=>{
    console.log(error)
    return callback({state:false})
})
      
}

usuariosModel.Listar = function(post,callback){
   Mymodel.find({},{email:1,nombre:1,telefono:1, rol:1, estado:1}).then((respuesta)=>{
         return callback({datos:respuesta})
   })     
}

usuariosModel.ListarId = function(post,callback){
    Mymodel.find({_id:post._id},{email:1,nombre:1,telefono:1, rol:1, estado:1}).then((respuesta)=>{
          return callback({datos:respuesta})
    })     
 }

usuariosModel.Actualizar = function(post, callback){
   Mymodel.findByIdAndUpdate({_id:post._id},
    {
       nombre:post.nombre,
       telefono:post.telefono,
       rol:post.rol,
       estado:post.estado
    }
   ).then((respuesta)=>{
     return callback({state:true})
   }).catch((error)=>{
    console.log(error)
   })
   
}

usuariosModel.Eliminar =function(post, callback){
   
   Mymodel.deleteOne({_id:post._id}).then((respuesta)=>{
    return callback({state:true})  
   }).catch((error)=>{
    console.log(error)
   })
   
    // datos.splice(post.posicion,1)
}

usuariosModel.Guardar = function(post, callback){
    const instancia = new Mymodel
    instancia.nombre = post.nombre
    instancia.email = post.email
    instancia.telefono = post.telefono
    instancia.password = post.password
    instancia.rol = "Cliente"
    instancia.estado = 1 
 
 instancia.save().then((respuesta)=>{
     console.log(respuesta)
     return callback({state:true})
 }).catch((error)=>{
     console.log(error)
     return callback({state:false})
 })
       
 }


usuariosModel.Mymodel = Mymodel 
module.exports.usuariosModel = usuariosModel