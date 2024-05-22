import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextComponent } from '../shared/input-text/input-text.component';
import { RouterModule } from '@angular/router';
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
  constructor(private toastr: ToastrService) {}

  username: string = '';
  password: string = '';

  login(): void {
    if (this.username.trim() === '' || this.password.trim() === '') {
      this.toastr.error('Preencha os campos corretamente.');
      return;
    }
  }
}
