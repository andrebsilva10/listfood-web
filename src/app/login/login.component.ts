import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextComponent } from '../shared/input-text/input-text.component';
import { Router, RouterModule } from '@angular/router';
import { ButtonPrimaryComponent } from '../shared/button-primary/button-primary.component';
import { FormComponent } from '../shared/form/form.component';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private router: Router, private toastr: ToastrService) {}

  login() {
    if (this.username.trim() === '' || this.password.trim() === '') {
      this.toastr.error('Preencha os campos corretamente.');
      return;
    }
  }

  goToSignUp() {
    this.router.navigate(['/cadastrar-se', { username: this.username }]);
  }
}
