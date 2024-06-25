import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CadastrarSeComponent } from './cadastrar-se/cadastrar-se.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cadastrar-se', component: CadastrarSeComponent },
];
