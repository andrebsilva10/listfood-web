import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
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
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-cadastrar-se',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    InputTextComponent,
    ButtonPrimaryComponent,
    FormComponent,
    FontAwesomeModule,
  ],
  templateUrl: './cadastrar-se.component.html',
  styleUrls: ['./cadastrar-se.component.scss'],
})
export class CadastrarSeComponent {
  nome: string = '';
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  cep: string = '';
  rua: string = '';
  bairro: string = '';
  cidade: string = '';
  estado: string = '';
  usernameExists: boolean = false;
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
    private http: HttpClient
  ) {}

  checkUsername(): void {
    this.apiService.getAllUsers().subscribe((users) => {
      this.usernameExists = users.some(
        (user) => user.username === this.username
      );
      this.validateForm();
    });
  }

  validateForm(): void {
    this.isFormValid =
      !!this.nome &&
      !!this.username &&
      !this.usernameExists &&
      !!this.password &&
      this.password === this.confirmPassword &&
      !!this.cep &&
      !!this.rua &&
      !!this.bairro &&
      !!this.cidade &&
      !!this.estado;
  }

  cadastrarSe(): void {
    if (!this.isFormValid) {
      this.toastr.error('Preencha todos os campos corretamente.');
      return;
    }

    const novoUsuario = {
      id: '',
      nome: this.nome,
      username: this.username,
      password: this.password,
      cep: this.cep,
      rua: this.rua,
      bairro: this.bairro,
      cidade: this.cidade,
      estado: this.estado,
    };

    this.apiService.createUser(novoUsuario).subscribe(
      () => {
        this.toastr.success('Usuário cadastrado com sucesso!');
        this.router.navigate(['/login']);
      },
      (error) => {
        this.toastr.error('Erro ao cadastrar usuário.');
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
    if (this.usernameExists) {
      return 'Nome de usuário já está em uso.';
    } else if (!this.username) {
      return 'O usuário é obrigatório.';
    } else if (!/^[a-zA-Z0-9_]{5,}$/.test(this.username)) {
      return 'O usuário deve conter pelo menos 5 caracteres e não pode conter espaços.';
    }
    return '';
  }
}
