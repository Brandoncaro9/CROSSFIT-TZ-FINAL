import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClientModule } from '@angular/common/http';
import { PeticionService } from '../../servicios/peticion.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: PeticionService;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, HttpClientModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    service = TestBed.inject(PeticionService);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debe fallar el login cuando no tiene el email', (done) => {
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
  
      component.email = ""
      component.password = ""
  
      component.Login()
  
      setTimeout(() =>{
        expect(component.respuestaapi.mensaje).toEqual("El campo email es obligatorio")
        done()     
      },40)
  
    
  });

  it('Debe fallar el login cuando no tiene el password', (done) => {
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
  
      component.email = "Brandoncaherrera@gmail.com"
      component.password = ""
  
      component.Login()
  
      setTimeout(() =>{
        expect(component.respuestaapi.mensaje).toEqual("El campo password es obligatorio")
        done()     
      },40)
  
    
  });

  it('Debe fallar cuando la cuenta no esta activa', (done) => {
    
    const mokupUrl = "http://localhost:3000/usuarios/registrar"
    const mokuppayload = {
       nombre:"Brandon",
       email:"brandoncaherrera@gmail.com",
       telefono:"3204442634",
       password:"123456"

    }
    
    service.Post(mokupUrl,mokuppayload).then((res:any) =>{
    
    })
    
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.email = "Brandoncaherrera@gmail.com"
    component.password = "123456"

    component.Login()

    setTimeout(() =>{
      expect(component.respuestaapi.mensaje).toEqual("Por favor Activar Cuenta")
      done()     
    },40)

  
   });

});
