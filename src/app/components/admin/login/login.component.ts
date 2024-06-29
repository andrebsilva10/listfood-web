import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InputTextComponent } from '../../shared/input-text/input-text.component';
import { ButtonPrimaryComponent } from '../../shared/button-primary/button-primary.component';
import { FormComponent } from '../../shared/form/form.component';
import { AuthService } from '../../../services/auth.service';
import { faUserCircle, faLock } from '@fortawesome/free-solid-svg-icons';

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
  isValid: boolean = false;

  faUserCircle = faUserCircle;
  faLock = faLock;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.updateValidity();
  }

  updateValidity() {
    this.isValid =
      this.username.trim().length >= 5 && this.password.trim().length >= 8;
  }

  login() {
    if (!this.isValid) {
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
