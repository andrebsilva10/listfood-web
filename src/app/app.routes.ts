import { Routes } from '@angular/router';
import { CadastrarSeComponent } from './components/admin/cadastrar-se/cadastrar-se.component';
import { authGuard } from './guards/auth.guard';
import { publicGuard } from './guards/public.guard';
import { ListasComponent } from './components/lista/listas/listas.component';
import { CadastroListaComponent } from './components/lista/cadastro-lista/cadastro-lista.component';
import { LoginComponent } from './components/admin/login/login.component';
import { DetalhesListaComponent } from './components/lista/detalhes-lista/detalhes-lista.component';
import { CadastroProdutoComponent } from './components/produto/cadastro-produto/cadastro-produto.component';
import { ConfiguracoesComponent } from './components/admin/configuracoes/configuracoes.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [publicGuard] },
  {
    path: 'cadastrar-se',
    component: CadastrarSeComponent,
    canActivate: [publicGuard],
  },
  { path: 'listas', component: ListasComponent, canActivate: [authGuard] },
  {
    path: 'cadastro-lista',
    component: CadastroListaComponent,
    canActivate: [authGuard],
  },
  {
    path: 'cadastro-lista/:id',
    component: CadastroListaComponent,
    canActivate: [authGuard],
  },
  {
    path: 'detalhes-lista/:id',
    component: DetalhesListaComponent,
    canActivate: [authGuard],
  },
  {
    path: 'cadastro-produto/:listaId',
    component: CadastroProdutoComponent,
    canActivate: [authGuard],
  },
  {
    path: 'configuracoes',
    component: ConfiguracoesComponent,
    canActivate: [authGuard],
  },
  {
    path: 'cadastro-produto/:listaId/:id',
    component: CadastroProdutoComponent,
    canActivate: [authGuard],
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/layout/inicio/inicio.component').then(
        (m) => m.InicioComponent
      ),
  },
  {
    path: '**',
    redirectTo: '/login',
  },
];
