
const mongoose = require("mongoose")

var usuariosController = require("./usuariosController.js").usuariosController
global.SHA256 = require("sha256")
const config = require("../../config.js").config
var usuariosModel = require("../modelos/usuariosModel.js").usuariosModel



describe("POST usuarios/registrar",() =>{
   let request;
   let response;

   beforeAll((done) => {

    mongoose.connect("mongodb://127.0.0.1:27017/PruebaNodeTest").then((respuesta)=>{
        console.log("Conexion a mongo correcta")
        done()
    }).catch((error)=>{
        console.log(error)
    })

   })
   
    beforeEach(() =>{
      request = {body:{},params:{},session:{}}
      response = {json:jest.fn()}

    });


    test("Debe fallar cuando el campo nombre no este presente", (done) =>{
       request.body = {}

       usuariosController.Registrar(request,response)

       expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo nombre es obligatorio"})
       done()
    })

    test("Debe fallar cuando el campo email no este presente", (done) =>{
        request.body = {
            nombre:"Brandon"
        }
 
        usuariosController.Registrar(request,response)
 
        expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo email es obligatorio"})
        done()
     })

     test("Debe fallar cuando el campo telefono no este presente", (done) =>{
        request.body = {
            nombre:"Brandon",
            email:"brandoncaherrera@gmail.com"
        }
 
        usuariosController.Registrar(request,response)
 
        expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo telefono no puede venir vacio"})
        done()
     })

     test("Debe fallar cuando el campo password no este presente", (done) =>{
        request.body = {
            nombre:"Brandon",
            email:"brandoncaherrera@gmail.com",
            telefono:"3204442634"
        }
 
        usuariosController.Registrar(request,response)
 
        expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo password es obligatorio"})
        done()
     })

     test("Debe regstrar el usuario", (done) =>{
        request.body = {
            nombre:"Brandon",
            email:"brandoncaherrera@gmail.com",
            telefono:"3204442634",
            password:"123456"
        }
 
        usuariosController.Registrar(request,response)

        setTimeout(() => {
            
        expect(response.json).toHaveBeenCalledWith({state:true,mensaje:"Usuario guardado correctamente, verifique su bandeja de entrada"})
        done()
            
        }, 1000);
 
     })

     test("Debe fallar cuando el email ya existe", (done) =>{
        request.body = {
            nombre:"Brandon",
            email:"brandoncaherrera@gmail.com",
            telefono:"3204442634",
            password:"123456"
        }
 
        usuariosController.Registrar(request,response)

        setTimeout(() => {
            
        expect(response.json).toHaveBeenCalledWith({state:false,mensaje:"El Email ya existe, intente con otra"})
        done()
            
        }, 1000);
 
     })

     afterAll((done) => {
         usuariosModel.Mymodel.findOneAndDelete({email:"brandoncaherrera@gmail.com"}).then((respuesta) => {
            setTimeout(() => {
                done()
            }, 40) 
          
         })
     })




     

})

describe("POST usuarios/guardar",() =>{
    let request;
    let response;
 
    beforeAll((done) => {
 
     mongoose.connect("mongodb://127.0.0.1:27017/PruebaNodeTest").then((respuesta)=>{
         console.log("Conexion a mongo correcta")
         done()
     }).catch((error)=>{
         console.log(error)
     })
 
    })
    
     beforeEach(() =>{
       request = {body:[]}
       response = {json:jest.fn()}
 
     });
 
 
     test("Debe fallar cuando el campo nombre no este presente", (done) =>{
        request.body = {}
 
        usuariosController.Guardar(request,response)
 
        expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo nombre es obligatorio"})
        done()
     })
 
     test("Debe fallar cuando el campo email no este presente", (done) =>{
         request.body = {
             nombre:"Brandon"
         }
  
         usuariosController.Guardar(request,response)
  
         expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo email es obligatorio"})
         done()
      })
 
      test("Debe fallar cuando el campo telefono no este presente", (done) =>{
         request.body = {
             nombre:"Brandon",
             email:"brandoncaherrera@gmail.com"
         }
  
         usuariosController.Guardar(request,response)
  
         expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo telefono no puede venir vacio"})
         done()
      })
 
      test("Debe fallar cuando el campo password no este presente", (done) =>{
         request.body = {
             nombre:"Brandon",
             email:"brandoncaherrera@gmail.com",
             telefono:"3204442634"
         }
  
         usuariosController.Guardar(request,response)
  
         expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo password es obligatorio"})
         done()
      })
 
      test("Debe regstrar el usuario", (done) =>{
         request.body = {
             nombre:"Brandon",
             email:"brandoncaherrera@gmail.com",
             telefono:"3204442634",
             password:"123456"
         }
  
         usuariosController.Guardar(request,response)
 
         setTimeout(() => {
             
         expect(response.json).toHaveBeenCalledWith({state:true,mensaje:"Usuario guardado correctamente"})
         done()
             
         }, 1000);
  
      })
 
      test("Debe fallar cuando el email ya existe", (done) =>{
         request.body = {
             nombre:"Brandon",
             email:"brandoncaherrera@gmail.com",
             telefono:"3204442634",
             password:"123456"
         }
  
         usuariosController.Guardar(request,response)
 
         setTimeout(() => {
             
         expect(response.json).toHaveBeenCalledWith({state:false,mensaje:"El Email ya existe, intente con otra"})
         done()
             
         }, 1000);
  
      })


      afterAll((done) => {
        usuariosModel.Mymodel.findOneAndDelete({email:"brandoncaherrera@gmail.com"}).then((respuesta) => {
           setTimeout(() => {
               done()
           }, 40) 
         
        })
    })
 
      
 
 })

 describe("POST usuarios/login",() =>{
    let request;
    let response;
 
    beforeAll((done) => {
 
     mongoose.connect("mongodb://127.0.0.1:27017/PruebaNodeTest").then((respuesta)=>{
         console.log("Conexion a mongo correcta")
         done()
     }).catch((error)=>{
         console.log(error)
     })
 
    })
    
     beforeEach(() =>{
       request = {body:{},params:{},session:{}}
       response = {json:jest.fn()}
 
     });
 
 
     test("Debe fallar cuando el campo email no este presente", (done) =>{
        request.body = {}
 
        usuariosController.Login(request,response)
 
        expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo email es obligatorio"})
        done()
     })

     test("Debe fallar cuando el campo password no este presente", (done) =>{
        request.body = {
            email :"brandoncaherrera@gmail.com"
        }
 
        usuariosController.Login(request,response)
 
        expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo password es obligatorio"})
        done()
     })

     test("Debe registrar el usuario", (done) =>{
        request.body = {
            nombre:"Brandon",
            email:"brandoncaherrera@gmail.com",
            telefono:"3204442634",
            password:"123456"
        }
 
        usuariosController.Registrar(request,response)

        setTimeout(() => {
            
        expect(response.json).toHaveBeenCalledWith({state:true,mensaje:"Usuario guardado correctamente, verifique su bandeja de entrada"})
        done()
            
        }, 1000);
 
     })
 

      test("Debe solicitar que active la cuenta", (done) =>{
         request.body = {
             email:"brandoncaherrera@gmail.com",
             password:"123456"
         }
  
         usuariosController.Login(request,response)
 
         setTimeout(() => {
             
         expect(response.json).toHaveBeenCalledWith({estate:true, mensaje:"Por favor Activar Cuenta"})
         done()
             
         }, 1000);
  
      })

      test("Debe iniciar session correctamente", (done) =>{

       usuariosModel.Mymodel.findOneAndUpdate({email:"brandoncaherrera@gmail.com"},{estado:1}).then((respuesta) => {
          
        request.body = {
            email:"brandoncaherrera@gmail.com",
            password:"123456"
        }
 
        usuariosController.Login(request,response)

        console.log(response)

        setTimeout(() => {
            
        expect(response.json).toHaveBeenCalledWith(
            // {
            //     estate:true
            //     _id: "6785e32dadd9de66d6728be1",
            //     mensaje: "Bienvenid@ Brandon",
            //     nombre: "Brandon",
            //     rol: "Cliente",
            
            // })
            expect.objectContaining({
                mensaje:"Bienvenid@ Brandon"
            })
        )
        done()
            
        }, 1000)

       })
 
     })


 
    //   test("Debe fallar cuando el email ya existe", (done) =>{
    //      request.body = {
    //          nombre:"Brandon",
    //          email:"brandoncaherrera@gmail.com",
    //          telefono:"3204442634",
    //          password:"123456"
    //      }
  
    //      usuariosController.Guardar(request,response)
 
    //      setTimeout(() => {
             
    //      expect(response.json).toHaveBeenCalledWith({state:false,mensaje:"El Email ya existe, intente con otra"})
    //      done()
             
    //      }, 1000);
  
    //   })


      afterAll((done) => {
        usuariosModel.Mymodel.findOneAndDelete({email:"brandoncaherrera@gmail.com"}).then((respuesta) => {
           setTimeout(() => {
               done()
           }, 40) 
         
        })
    })
 
      
 
 })

 describe("POST usuarios/listar",() =>{
    let request;
    let response;
 
    beforeAll((done) => {
 
     mongoose.connect("mongodb://127.0.0.1:27017/PruebaNodeTest").then((respuesta)=>{
         console.log("Conexion a mongo correcta")
         done()
     }).catch((error)=>{
         console.log(error)
     })
 
    })
    
     beforeEach(() =>{
       request = {body:{},params:{},session:{}}
       response = {json:jest.fn()}
 
     });


     test("Debe registrar el usuario", (done) =>{
        request.body = {
            nombre:"Brandon",
            email:"brandoncaherrera@gmail.com",
            telefono:"3204442634",
            password:"123456"
        }
 
        usuariosController.Registrar(request,response)

        setTimeout(() => {
            
        expect(response.json).toHaveBeenCalledWith({state:true,mensaje:"Usuario guardado correctamente, verifique su bandeja de entrada"})
        done()
            
        }, 1000);
 
     })
 
     test("Debe listar los usuarios", (done) =>{

        usuariosModel.Mymodel.findOne({email:"brandoncaherrera@gmail.com"}).then((respuesta) => {
           
         request.body = {
             _id:respuesta._id,
             nombre:"Brandon",
             email:"brandoncaherrera@gmail.com",
             telefono:"3204442634"
         };
  
         usuariosController.Listar(request,response);
 
         console.log(response)
 
         setTimeout(() => {

            const respuesta = response.json.mock.calls[0][0];
            expect(respuesta.datos.length).toEqual(1);             
         done()
             
         }, 4000)
 
        })
  
      })
 
    //   test("Debe fallar cuando el email ya existe", (done) =>{
    //      request.body = {
    //          nombre:"Brandon",
    //          email:"brandoncaherrera@gmail.com",
    //          telefono:"3204442634",
    //          password:"123456"
    //      }
  
    //      usuariosController.Guardar(request,response)
 
    //      setTimeout(() => {
             
    //      expect(response.json).toHaveBeenCalledWith({state:false,mensaje:"El Email ya existe, intente con otra"})
    //      done()
             
    //      }, 1000);
  
    //   })


      afterAll((done) => {
        usuariosModel.Mymodel.findOneAndDelete({email:"brandoncaherrera@gmail.com"}).then((respuesta) => {
           setTimeout(() => {
               done()
           }, 40) 
         
        })
    })
 
      
 
 })

 describe("POST usuarios/listarid",() =>{
    let request;
    let response;
 
    beforeAll((done) => {
 
     mongoose.connect("mongodb://127.0.0.1:27017/PruebaNodeTest").then((respuesta)=>{
         console.log("Conexion a mongo correcta")
         done()
     }).catch((error)=>{
         console.log(error)
     })
 
    })
    
     beforeEach(() =>{
       request = {body:{},params:{},session:{}}
       response = {json:jest.fn()}
 
     });


     test("Debe registrar el usuario", (done) =>{
        request.body = {
            nombre:"Brandon",
            email:"brandoncaherrera@gmail.com",
            telefono:"3204442634",
            password:"123456"
        }
 
        usuariosController.Registrar(request,response)

        setTimeout(() => {
            
        expect(response.json).toHaveBeenCalledWith({state:true,mensaje:"Usuario guardado correctamente, verifique su bandeja de entrada"})
        done()
            
        }, 1000);
 
     })
 
     test("Debe fallar cuando el campo _id no este presente", (done) =>{
        request.body = {}
 
        usuariosController.ListarId(request,response)
 
        expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo _id es obligatorio"})
        done()
     })

     test("Debe listar el _id correctamente", (done) =>{

        usuariosModel.Mymodel.findOne({email:"brandoncaherrera@gmail.com"}).then((respuesta) => {
           
         request.body = {
             _id:respuesta._id
         };
  
         usuariosController.ListarId(request,response);
 
         console.log(response)
 
         setTimeout(() => {

            const respuesta = response.json.mock.calls[0][0];
            expect(respuesta.datos.length).toEqual(1);             
         done()
             
         }, 1000)
 
        })
  
      })
 
    //   test("Debe fallar cuando el email ya existe", (done) =>{
    //      request.body = {
    //          nombre:"Brandon",
    //          email:"brandoncaherrera@gmail.com",
    //          telefono:"3204442634",
    //          password:"123456"
    //      }
  
    //      usuariosController.Guardar(request,response)
 
    //      setTimeout(() => {
             
    //      expect(response.json).toHaveBeenCalledWith({state:false,mensaje:"El Email ya existe, intente con otra"})
    //      done()
             
    //      }, 1000);
  
    //   })


      afterAll((done) => {
        usuariosModel.Mymodel.findOneAndDelete({email:"brandoncaherrera@gmail.com"}).then((respuesta) => {
           setTimeout(() => {
               done()
           }, 40) 
         
        })
    })
 
      
 
 })

 describe("POST usuarios/eliminar",() =>{
    let request;
    let response;
 
    beforeAll((done) => {
 
     mongoose.connect("mongodb://127.0.0.1:27017/PruebaNodeTest").then((respuesta)=>{
         console.log("Conexion a mongo correcta")
         done()
     }).catch((error)=>{
         console.log(error)
     })
 
    })
    
     beforeEach(() =>{
       request = {body:{},params:{},session:{}}
       response = {json:jest.fn()}
 
     });


     test("Debe registrar el usuario", (done) =>{
        request.body = {
            nombre:"Brandon",
            email:"brandoncaherrera@gmail.com",
            telefono:"3204442634",
            password:"123456"
        }
 
        usuariosController.Registrar(request,response)

        setTimeout(() => {
            
        expect(response.json).toHaveBeenCalledWith({state:true,mensaje:"Usuario guardado correctamente, verifique su bandeja de entrada"})
        done()
            
        }, 1000);
 
     })
 
     test("Debe fallar cuando el campo _id no este presente", (done) =>{
        request.body = {}
 
        usuariosController.Eliminar(request,response)
 
        expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo _id es obligatorio"})
        done()
     })

     test("Debe eliminar el usuario correctamente", (done) =>{

        usuariosModel.Mymodel.findOneAndUpdate({email:"brandoncaherrera@gmail.com"},{estado:1}).then((respuesta) => {
           
         request.body = {
            _id:respuesta._id,
             email:"brandoncaherrera@gmail.com",
             password:"123456"
         }
  
         usuariosController.Eliminar(request,response)
 
         console.log(response)
 
         setTimeout(() => {
             
         expect(response.json).toHaveBeenCalledWith(
             // {
             //     estate:true
             //     _id: "6785e32dadd9de66d6728be1",
             //     mensaje: "Bienvenid@ Brandon",
             //     nombre: "Brandon",
             //     rol: "Cliente",
             
             // })
             expect.objectContaining({
                 mensaje:"Usuario elimando correctamente"
             })
         )
         done()
             
         }, 1000)
 
        })
  
      })




 
    //   test("Debe fallar cuando el email ya existe", (done) =>{
    //      request.body = {
    //          nombre:"Brandon",
    //          email:"brandoncaherrera@gmail.com",
    //          telefono:"3204442634",
    //          password:"123456"
    //      }
  
    //      usuariosController.Guardar(request,response)
 
    //      setTimeout(() => {
             
    //      expect(response.json).toHaveBeenCalledWith({state:false,mensaje:"El Email ya existe, intente con otra"})
    //      done()
             
    //      }, 1000);
  
    //   })


      afterAll((done) => {
        usuariosModel.Mymodel.findOneAndDelete({email:"brandoncaherrera@gmail.com"}).then((respuesta) => {
           setTimeout(() => {
               done()
           }, 40) 
         
        })
    })
 
      
 
 })
 
 describe("POST usuarios/actualizar",() =>{
    let request;
    let response;
 
    beforeAll((done) => {
 
     mongoose.connect("mongodb://127.0.0.1:27017/PruebaNodeTest").then((respuesta)=>{
         console.log("Conexion a mongo correcta")
         done()
     }).catch((error)=>{
         console.log(error)
     })
 
    })
    
     beforeEach(() =>{
       request = {body:[]}
       response = {json:jest.fn()}
 
     });

     test("Debe registrar el usuario", (done) =>{
        request.body = {
            nombre:"Brandon",
            email:"brandoncaherrera@gmail.com",
            telefono:"3204442634",
            password:"123456",
            rol:"Cliente",
            Estado:"1"
        }
 
        usuariosController.Registrar(request,response)

        setTimeout(() => {
            
        expect(response.json).toHaveBeenCalledWith({state:true,mensaje:"Usuario guardado correctamente, verifique su bandeja de entrada"})
        done()
            
        }, 1000);
 
     })
 
     test("Debe fallar cuando el campo _id no este presente", (done) =>{
        request.body = {

        }
 
        usuariosController.Actualizar(request,response)
 
        expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo _id es obligatorio"})
        done()
     })

     test("Debe fallar cuando el campo nombre no este presente", (done) =>{

        usuariosModel.Mymodel.findOneAndUpdate({email:"brandoncaherrera@gmail.com"},{estado:1}).then((respuesta) => {
           
         request.body = {
            _id:respuesta._id,
         }
  
         usuariosController.Actualizar(request,response)
 
         setTimeout(() => {
             
         expect(response.json).toHaveBeenCalledWith(
             // {
             //     estate:true
             //     _id: "6785e32dadd9de66d6728be1",
             //     mensaje: "Bienvenid@ Brandon",
             //     nombre: "Brandon",
             //     rol: "Cliente",
             
             // })
             expect.objectContaining({
                 mensaje:"El campo nombre es obligatorio"
             })
         )
         done()
             
         }, 1000)
 
        })
  
      })
     test("Debe fallar cuando el campo telefono no este presente", (done) =>{

        usuariosModel.Mymodel.findOneAndUpdate({email:"brandoncaherrera@gmail.com"},{estado:1}).then((respuesta) => {
           
         request.body = {
            _id:respuesta._id,
            nombre:"Brandon"
         }
  
         usuariosController.Actualizar(request,response)
 
         setTimeout(() => {
             
         expect(response.json).toHaveBeenCalledWith(
             // {
             //     estate:true
             //     _id: "6785e32dadd9de66d6728be1",
             //     mensaje: "Bienvenid@ Brandon",
             //     nombre: "Brandon",
             //     rol: "Cliente",
             
             // })
             expect.objectContaining({
                 mensaje:"El campo telefono es obligatorio"
             })
         )
         done()
             
         }, 1000)
 
        })
  
      })
     test("Debe fallar cuando el campo rol no este presente", (done) =>{

        usuariosModel.Mymodel.findOneAndUpdate({email:"brandoncaherrera@gmail.com"},{estado:1}).then((respuesta) => {
           
         request.body = {
            _id:respuesta._id,
            nombre:"Brandon",
            telefono:"3204442634"
         }
  
         usuariosController.Actualizar(request,response)
 
         setTimeout(() => {
             
         expect(response.json).toHaveBeenCalledWith(
             // {
             //     estate:true
             //     _id: "6785e32dadd9de66d6728be1",
             //     mensaje: "Bienvenid@ Brandon",
             //     nombre: "Brandon",
             //     rol: "Cliente",
             
             // })
             expect.objectContaining({
                 mensaje:"El campo rol es obligatorio"
             })
         )
         done()
             
         }, 1000)
 
        })
  
      })
     test("Debe fallar cuando el campo estado no este presente", (done) =>{

        usuariosModel.Mymodel.findOneAndUpdate({email:"brandoncaherrera@gmail.com"},{estado:1}).then((respuesta) => {
           
         request.body = {
            _id:respuesta._id,
            nombre:"Brandon",
            telefono:"3204442634",
            rol:"Cliente"
         }
  
         usuariosController.Actualizar(request,response)
 
         setTimeout(() => {
             
         expect(response.json).toHaveBeenCalledWith(
             // {
             //     estate:true
             //     _id: "6785e32dadd9de66d6728be1",
             //     mensaje: "Bienvenid@ Brandon",
             //     nombre: "Brandon",
             //     rol: "Cliente",
             
             // })
             expect.objectContaining({
                 mensaje:"El campo estado es obligatorio"
             })
         )
         done()
             
         }, 1000)
 
        })
  
      })
     test("Debe actualizar el usuario correcto", (done) =>{

        usuariosModel.Mymodel.findOneAndUpdate({email:"brandoncaherrera@gmail.com"},{estado:1}).then((respuesta) => {
           
         request.body = {
            _id:respuesta._id,
            nombre:"Brandon",
            telefono:"3204442634",
            rol:"Cliente",
            estado:"1"
         }
  
         usuariosController.Actualizar(request,response)

 
         setTimeout(() => {
             
         expect(response.json).toHaveBeenCalledWith(
             // {
             //     estate:true
             //     _id: "6785e32dadd9de66d6728be1",
             //     mensaje: "Bienvenid@ Brandon",
             //     nombre: "Brandon",
             //     rol: "Cliente",
             
             // })
             expect.objectContaining({
                 mensaje:"Usuario actualizado correctamente"
             })
         )
         done()
             
         }, 1000)
 
        })
  
      })
 
       afterAll((done) => {
        usuariosModel.Mymodel.findOneAndDelete({email:"brandoncaherrera@gmail.com"}).then((respuesta) => {
           setTimeout(() => {
               done()
           }, 40) 
         
        })
    })
 
      
 
 })

 describe("POST usuarios/activar",() =>{
    let request;
    let response;
 
    beforeAll((done) => {
 
     mongoose.connect("mongodb://127.0.0.1:27017/PruebaNodeTest").then((respuesta)=>{
         console.log("Conexion a mongo correcta")
         done()
     }).catch((error)=>{
         console.log(error)
     })
 
    })
    
     beforeEach(() =>{
       request = {body:[]}
       response = {json:jest.fn()}
 
     });

 
     test("Debe fallar cuando el campo email no este presente", (done) =>{
        request.body = {

        }
 
        usuariosController.activar(request,response)
 
        expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo email es obligatorio"})
        done()
     })

     test("Debe fallar cuando el campo codigo no este presente", (done) =>{
        request.body = {

            email:"brandoncaherrera@gmail.com"

        }
 
        usuariosController.activar(request,response)
 
        expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo codigo es obligatorio"})
        done()
     })

 
       afterAll((done) => {
        usuariosModel.Mymodel.findOneAndDelete({email:"brandoncaherrera@gmail.com"}).then((respuesta) => {
           setTimeout(() => {
               done()
           }, 40) 
         
        })
    })
 
      
 
 })

