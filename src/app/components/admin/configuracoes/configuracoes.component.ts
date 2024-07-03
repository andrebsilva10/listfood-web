import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../services/api.service';
import { InputTextComponent } from '../../shared/input-text/input-text.component';
import { ButtonPrimaryComponent } from '../../shared/button-primary/button-primary.component';
import { FormComponent } from '../../shared/form/form.component';
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
import { User, UserService } from '../../../services/user.service';

@Component({
  selector: 'app-configuracoes',
  standalone: true,
  imports: [
    FormsModule,
    InputTextComponent,
    ButtonPrimaryComponent,
    FormComponent,
  ],
  templateUrl: './configuracoes.component.html',
  styleUrls: ['./configuracoes.component.scss'],
})
export class ConfiguracoesComponent implements OnInit {
  nome: string = '';
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  cep: string = '';
  rua: string = '';
  bairro: string = '';
  cidade: string = '';
  estado: string = '';
  isFormValid: boolean = true;
  faUser = faUser;
  faUserCircle = faUserCircle;
  faLock = faLock;
  faMapMarkerAlt = faMapMarkerAlt;
  faRoad = faRoad;
  faMap = faMap;
  faCity = faCity;
  faFlag = faFlag;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private apiService: ApiService,
    private http: HttpClient,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.carregarDadosUsuario();
  }

  carregarDadosUsuario() {
    this.userService.getCurrentUser().subscribe(
      (user) => {
        if (user) {
          this.nome = user.nome;
          this.username = user.username;
          this.cep = user.cep;
          this.rua = user.rua;
          this.bairro = user.bairro;
          this.cidade = user.cidade;
          this.estado = user.estado;
          this.validateForm();
        } else {
          this.toastr.error('Usuário não encontrado.');
        }
      },
      (error) => {
        this.toastr.error('Erro ao carregar dados do usuário.');
        console.error('Erro:', error);
      }
    );
  }

  validateForm(): void {
    this.isFormValid =
      !!this.nome &&
      !!this.username &&
      (!!this.password ? this.password === this.confirmPassword : true) &&
      !!this.cep &&
      !!this.rua &&
      !!this.bairro &&
      !!this.cidade &&
      !!this.estado;
  }

  getPasswordErrorMessage(): string {
    if (this.password && this.password.length > 0) {
      return 'A senha deve conter pelo menos 8 caracteres, uma letra e um número';
    }
    return '';
  }

  getConfirmPasswordErrorMessage(): string {
    if (this.confirmPassword !== this.password) {
      return 'As senhas não coincidem.';
    }
    return '';
  }

  atualizarUsuario(): void {
    if (!this.isFormValid) {
      this.toastr.error('Preencha todos os campos corretamente.');
      return;
    }

    const userId = localStorage.getItem('userId');
    if (!userId) {
      this.toastr.error('Usuário não encontrado.');
      return;
    }

    const usuarioAtualizado: User = {
      id: userId,
      nome: this.nome,
      username: this.username,
      password: this.password || '',
      cep: this.cep,
      rua: this.rua,
      bairro: this.bairro,
      cidade: this.cidade,
      estado: this.estado,
    };

    this.apiService.updateUser(userId, usuarioAtualizado).subscribe(
      () => {
        this.toastr.success('Usuário atualizado com sucesso!');
        this.router.navigate(['/']);
      },
      (error) => {
        this.toastr.error('Erro ao atualizar usuário.');
        console.error('Erro:', error);
      }
    );
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
            this.validateForm();
          },
          (error) => {
            this.toastr.error('Erro ao buscar endereço.');
            console.error('Erro:', error);
          }
        );
    }
  }

  getUsernameErrorMessage(): string {
    if (!this.username) {
      return 'O usuário é obrigatório.';
    } else if (!/^[a-zA-Z0-9_]{5,}$/.test(this.username)) {
      return 'O usuário deve conter pelo menos 5 caracteres e não pode conter espaços.';
    }
    return '';
  }
}
