import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CadastrarSeComponent } from './cadastrar-se/cadastrar-se.component';

import { authGuard } from './guards/auth.guard';
import { ListasComponent } from './listas/listas.component';
import { CadastroListaComponent } from './cadastro-lista/cadastro-lista.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cadastrar-se', component: CadastrarSeComponent },
  { path: 'listas', component: ListasComponent },
  { path: 'cadastro-lista', component: CadastroListaComponent },

  {
    path: '**',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./inicio/inicio.component').then((m) => m.InicioComponent),
  },
];
