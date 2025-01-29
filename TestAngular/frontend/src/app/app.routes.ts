import { Routes } from '@angular/router';
import { RegistroComponent } from './componentes/registro/registro.component';
import { LoginComponent } from './componentes/login/login.component';

export const routes: Routes = [
    {path:"registro", component:RegistroComponent, pathMatch:"full"},
    {path:"login", component:LoginComponent, pathMatch:"full"}

];
