import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginMessage: string = '';

  login(): void {
    if (this.username === '' || this.password === '') {
      this.loginMessage = 'Por favor, preencha os campos de usuário e senha';
      return;
    }

    this.loginMessage = `Olá, ${this.username}! Você está logado com sucesso!`;
  }
}
