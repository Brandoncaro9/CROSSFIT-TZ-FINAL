import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroComponent } from './registro.component';
import { HttpClientModule } from '@angular/common/http';

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroComponent, HttpClientModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  }); 

  it('Debe fallar el registro cuando no tiene el nombre', (done) => {
    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.email = ""
    component.nombre = ""
    component.password = ""
    component.telefono = ""

    component.Registrar()

    setTimeout(() =>{
      expect(component.respuestaapi.mensaje).toEqual("El campo nombre es obligatorio")
      done()     
    },40)

  
  });

  it('Debe fallar el registro cuando no tiene el email', (done) => {
    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.nombre = "Brandon caro"
    component.email = ""
    component.password = ""
    component.telefono = ""

    component.Registrar()

    setTimeout(() =>{
      expect(component.respuestaapi.mensaje).toEqual("El campo email es obligatorio")
      done()     
    },40)

  
  });

  it('Debe fallar el registro cuando no tiene el telefono', (done) => {
    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.nombre = "Brandon caro"
    component.email = "Brandoncaherrera@gmail.com"
    component.telefono = ""
    component.password = ""

    component.Registrar()

    setTimeout(() =>{
      expect(component.respuestaapi.mensaje).toEqual("El campo telefono no puede venir vacio")
      done()     
    },40)

  
  });

  it('Debe fallar el registro cuando no tiene el password', (done) => {
    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.nombre = "Brandon caro"
    component.email = "Brandoncaherrera@gmail.com"
    component.telefono = "3204442634"
    component.password = ""

    component.Registrar()

    setTimeout(() =>{
      expect(component.respuestaapi.mensaje).toEqual("El campo password es obligatorio")
      done()     
    },40)

  
  });

  it('Debe registrar al usuario correctamente', (done) => {
    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.nombre = "Brandon caro"
    component.email = "Brandoncaherrera@gmail.com"
    component.telefono = "3204442634"
    component.password = "123456"

    component.Registrar()

    setTimeout(() =>{

      if(component.respuestaapi.state == true){
        expect(component.respuestaapi.mensaje).toEqual("Usuario guardado correctamente, verifique su bandeja de entrada")
      }
      else{
        expect(component.respuestaapi.mensaje).toEqual("El Email ya existe, intente con otra")
      }
      done()     
    },40)

  
  });


});
