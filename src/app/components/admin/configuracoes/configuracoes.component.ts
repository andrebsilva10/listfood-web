import { Component } from '@angular/core';
import { FormComponent } from '../../shared/form/form.component';
import { ButtonPrimaryComponent } from '../../shared/button-primary/button-primary.component';
import { InputTextComponent } from '../../shared/input-text/input-text.component';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import {
  faUser,
  faUserCircle,
  faLock,
  faMapMarkerAlt,
  faRoad,
  faMap,
  faCity,
  faFlag,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-configuracoes',
  standalone: true,
  imports: [
    FormComponent,
    ButtonPrimaryComponent,
    InputTextComponent,
    RouterModule,
  ],
  templateUrl: './configuracoes.component.html',
  styleUrls: ['./configuracoes.component.scss'],
})
export class ConfiguracoesComponent {
  nome: string = '';
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  cep: string = '';
  rua: string = '';
  bairro: string = '';
  cidade: string = '';
  estado: string = '';

  faUser = faUser;
  faUserCircle = faUserCircle;
  faLock = faLock;
  faMapMarkerAlt = faMapMarkerAlt;
  faRoad = faRoad;
  faMap = faMap;
  faCity = faCity;
  faFlag = faFlag;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private toastr: ToastrService,
    private userService: UserService,
    private http: HttpClient
  ) {}

  atualizarUsuario() {
    if (this.password !== this.confirmPassword) {
      this.toastr.error('As senhas não coincidem.');
      return;
    }

    this.userService.getCurrentUser().subscribe((user) => {
      if (user) {
        const updatedUser = {
          ...user,
          nome: this.nome,
          username: this.username,
          password: this.password,
          cep: this.cep,
          rua: this.rua,
          bairro: this.bairro,
          cidade: this.cidade,
          estado: this.estado,
        };

        this.apiService.updateUser(user.id, updatedUser).subscribe(
          () => {
            this.toastr.success('Informações atualizadas com sucesso!');
            this.router.navigate(['/home']);
          },
          (error) => {
            this.toastr.error('Erro ao atualizar informações.');
            console.error('Erro:', error);
          }
        );
      }
    });
  }

  buscarEndereco() {
    if (this.cep.length === 8) {
      this.http
        .get<any>(`https://viacep.com.br/ws/${this.cep}/json/`)
        .subscribe(
          (data) => {
            this.rua = data.logradouro;
            this.bairro = data.bairro;
            this.cidade = data.localidade;
            this.estado = data.uf;
          },
          (error) => {
            this.toastr.error('Erro ao buscar endereço.');
            console.error('Erro:', error);
          }
        );
    }
  }
}
