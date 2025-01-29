import { Component } from '@angular/core';
import { PeticionService } from '../../servicios/peticion.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  constructor(private peticion:PeticionService){}

  nombre:string = ""
  email:string = ""
  password:string = ""
  telefono:string = ""

  respuestaapi:any = []


  Registrar(){

    var post = {
      host:this.peticion.hostReal,
      path:"/usuarios/registrar",
      payload:{
        nombre:this.nombre,
        email:this.email,
        telefono:this.telefono,
        password:this.password

      }
    }

    this.peticion.Post(post.host + post.path, post.payload).then((res:any) => {

       console.log(res)
       this.respuestaapi = res

    })

  }

}
