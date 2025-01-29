import { Component } from '@angular/core';
import { PeticionService } from '../../servicios/peticion.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

    constructor(private peticion:PeticionService){}
    
    email:string = ""
    password:string = ""
    
    respuestaapi:any = []
    
    
     Login(){
    
        var post = {
          host:this.peticion.hostReal,
          path:"/usuarios/login",
          payload:{
            email:this.email,
            password:this.password
    
          }
        }
    
        this.peticion.Post(post.host + post.path, post.payload).then((res:any) => {
    
           console.log(res)
           this.respuestaapi = res
    
        })
    
      }

}
