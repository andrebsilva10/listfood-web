import { Routes } from '@angular/router';
import { CadastrarSeComponent } from './components/admin/cadastrar-se/cadastrar-se.component';

import { authGuard } from './guards/auth.guard';
import { ListasComponent } from './components/lista/listas/listas.component';
import { CadastroListaComponent } from './components/lista/cadastro-lista/cadastro-lista.component';
import { LoginComponent } from './components/admin/login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cadastrar-se', component: CadastrarSeComponent },
  { path: 'listas', component: ListasComponent },
  { path: 'cadastro-lista', component: CadastroListaComponent },

  {
    path: '**',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/layout/inicio/inicio.component').then(
        (m) => m.InicioComponent
      ),
  },
];
