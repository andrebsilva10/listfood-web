import { Routes } from '@angular/router';
import { CadastrarSeComponent } from './components/admin/cadastrar-se/cadastrar-se.component';
import { authGuard } from './guards/auth.guard';
import { ListasComponent } from './components/lista/listas/listas.component';
import { CadastroListaComponent } from './components/lista/cadastro-lista/cadastro-lista.component';
import { LoginComponent } from './components/admin/login/login.component';
import { DetalhesListaComponent } from './components/lista/detalhes-lista/detalhes-lista.component';
import { CadastroProdutoComponent } from './components/produto/cadastro-produto/cadastro-produto.component';
import { ConfiguracoesComponent } from './components/admin/configuracoes/configuracoes.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cadastrar-se', component: CadastrarSeComponent },
  { path: 'listas', component: ListasComponent },
  { path: 'cadastro-lista', component: CadastroListaComponent },
  { path: 'cadastro-lista/:id', component: CadastroListaComponent },
  { path: 'detalhes-lista/:id', component: DetalhesListaComponent },
  { path: 'cadastro-produto/:listaId', component: CadastroProdutoComponent },
  { path: 'configuracoes', component: ConfiguracoesComponent },
  {
    path: 'cadastro-produto/:listaId/:id',
    component: CadastroProdutoComponent,
  },

  {
    path: '**',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/layout/inicio/inicio.component').then(
        (m) => m.InicioComponent
      ),
  },
];
