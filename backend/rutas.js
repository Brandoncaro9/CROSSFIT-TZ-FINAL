var usuariosController = require ("./api/controladores/usuariosController.js").usuariosController


app.post("/usuarios/Registrar", function(request,response){
    usuariosController.Registrar(request,response)    
  })

app.post("/usuarios/Guardar", function(request,response){
  usuariosController.Guardar(request,response)    
})


app.get("/usuarios/Listar",function(request,response){
   usuariosController.Listar(request,response)
})

app.post("/usuarios/ListarId",function(request,response){
  usuariosController.ListarId(request,response)
})

app.put("/usuarios/Actualizar", function(request,response){
   usuariosController.Actualizar(request,response)
})

app.post("/usuarios/Eliminar", function(request,response){
    usuariosController.Eliminar(request,response)
  })

  app.post("/usuarios/Login", function(request,response){
   usuariosController.Login(request,response)
 })

 app.post("/usuarios/activar",function(request,response){
  usuariosController.activar(request,response)
})

app.post("/usuarios/solicitarcodigo", function(request,response){
  usuariosController.solicitarcodigo(request,response)
})

app.post("/usuarios/recuperarpass", function(request,response){
  usuariosController.recuperarpass(request,response)
})

app.post("/usuarios/estado", function(request,response){
   response.json(request.session)
})

app.post("/usuarios/logout", function(request,response){
   request.session.destroy()
   response.json({state:true})
})






var productosController = require ("./api/controladores/productosController.js").productosController


app.post("/productos/Guardar", function(request,response){
  productosController.Guardar(request,response)    
})


app.get("/productos/Listar",function(request,response){
   productosController.Listar(request,response)
})

app.post("/productos/ListarId",function(request,response){
  productosController.ListarId(request,response)
})

app.put("/productos/Actualizar", function(request,response){
   productosController.Actualizar(request,response)
})

app.post("/productos/Eliminar", function(request,response){
    productosController.Eliminar(request,response)
  })






  var entrenamientosController = require ("./api/controladores/entrenamientosController.js").entrenamientosController


app.post("/entrenamientos/Guardar", function(request,response){
  entrenamientosController.Guardar(request,response)    
})


app.get("/entrenamientos/Listar",function(request,response){
   entrenamientosController.Listar(request,response)
})

app.post("/entrenamientos/ListarId",function(request,response){
  entrenamientosController.ListarId(request,response)
})

app.put("/entrenamientos/Actualizar", function(request,response){
   entrenamientosController.Actualizar(request,response)
})

app.post("/entrenamientos/Eliminar", function(request,response){
    entrenamientosController.Eliminar(request,response)
  })





  var mensualidadesController = require ("./api/controladores/mensualidadesController.js").mensualidadesController


app.post("/mensualidades/Guardar", function(request,response){
  mensualidadesController.Guardar(request,response)    
})


app.get("/mensualidades/Listar",function(request,response){
   mensualidadesController.Listar(request,response)
})

app.post("/mensualidades/ListarId",function(request,response){
  mensualidadesController.ListarId(request,response)
})

app.put("/mensualidades/Actualizar", function(request,response){
   mensualidadesController.Actualizar(request,response)
})

app.post("/mensualidades/Eliminar", function(request,response){
    mensualidadesController.Eliminar(request,response)
  })




  var horarioslvController = require ("./api/controladores/horarioslvController.js").horarioslvController


app.post("/horarioslv/Guardar", function(request,response){
  horarioslvController.Guardar(request,response)    
})


app.get("/horarioslv/Listar",function(request,response){
   horarioslvController.Listar(request,response)
})

app.post("/horarioslv/ListarId",function(request,response){
  horarioslvController.ListarId(request,response)
})

app.put("/horarioslv/Actualizar", function(request,response){
   horarioslvController.Actualizar(request,response)
})

app.post("/horarioslv/Eliminar", function(request,response){
    horarioslvController.Eliminar(request,response)
  })




  var horariosfdsController = require ("./api/controladores/horariosfdsController.js").horariosfdsController


  app.post("/horariosfds/Guardar", function(request,response){
    horariosfdsController.Guardar(request,response)    
  })
  
  
  app.get("/horariosfds/Listar",function(request,response){
     horariosfdsController.Listar(request,response)
  })
  
  app.post("/horariosfds/ListarId",function(request,response){
    horariosfdsController.ListarId(request,response)
  })
  
  app.put("/horariosfds/Actualizar", function(request,response){
     horariosfdsController.Actualizar(request,response)
  })
  
  app.post("/horariosfds/Eliminar", function(request,response){
      horariosfdsController.Eliminar(request,response)
    })



    var valoresController = require ("./api/controladores/valoresController.js").valoresController


    app.post("/valores/Guardar", function(request,response){
      valoresController.Guardar(request,response)    
    })
    
    
    app.get("/valores/Listar",function(request,response){
       valoresController.Listar(request,response)
    })
    
    app.post("/valores/ListarId",function(request,response){
      valoresController.ListarId(request,response)
    })
    
    app.put("/valores/Actualizar", function(request,response){
       valoresController.Actualizar(request,response)
    })
    
    app.post("/valores/Eliminar", function(request,response){
        valoresController.Eliminar(request,response)
      })

  


      var informanosController = require ("./api/controladores/informanosController.js").informanosController


      app.post("/informanos/Guardar", function(request,response){
        informanosController.Guardar(request,response)    
      })
      
      
      app.get("/informanos/Listar",function(request,response){
         informanosController.Listar(request,response)
      })
      
      app.post("/informanos/ListarId",function(request,response){
        informanosController.ListarId(request,response)
      })
      
      app.put("/informanos/Actualizar", function(request,response){
         informanosController.Actualizar(request,response)
      })
      
      app.post("/informanos/Eliminar", function(request,response){
          informanosController.Eliminar(request,response)
        })
  



        var coachsController = require ("./api/controladores/coachsController.js").coachsController


        app.post("/coachs/Guardar", function(request,response){
          coachsController.Guardar(request,response)    
        })
        
        
        app.get("/coachs/Listar",function(request,response){
           coachsController.Listar(request,response)
        })
        
        app.post("/coachs/ListarId",function(request,response){
          coachsController.ListarId(request,response)
        })
        
        app.put("/coachs/Actualizar", function(request,response){
           coachsController.Actualizar(request,response)
        })
        
        app.post("/coachs/Eliminar", function(request,response){
            coachsController.Eliminar(request,response)
          })
    
  
