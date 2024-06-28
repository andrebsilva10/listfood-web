import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InputTextComponent } from '../../shared/input-text/input-text.component';
import { ButtonPrimaryComponent } from '../../shared/button-primary/button-primary.component';
import { FormComponent } from '../../shared/form/form.component';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    InputTextComponent,
    ButtonPrimaryComponent,
    FormComponent,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  login() {
    if (this.username.trim() === '' || this.password.trim() === '') {
      this.toastr.error('Preencha os campos corretamente.');
      return;
    }

    this.authService
      .login(this.username, this.password)
      .subscribe((isLoggedIn: boolean) => {
        if (isLoggedIn) {
          this.toastr.success('Login realizado com sucesso!');
          this.router.navigate(['/']);
        } else {
          this.toastr.error('Usuário ou senha incorretos.');
        }
      });
  }

  goToSignUp() {
    this.router.navigate(['/cadastrar-se', { username: this.username }]);
  }
}
