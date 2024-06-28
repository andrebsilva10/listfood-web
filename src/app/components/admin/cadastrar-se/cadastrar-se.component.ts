import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { InputTextComponent } from '../../shared/input-text/input-text.component';
import { ButtonPrimaryComponent } from '../../shared/button-primary/button-primary.component';
import { FormComponent } from '../../shared/form/form.component';

@Component({
  selector: 'app-cadastrar-se',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    InputTextComponent,
    ButtonPrimaryComponent,
    FormComponent,
  ],
  templateUrl: './cadastrar-se.component.html',
  styleUrl: './cadastrar-se.component.scss',
})
export class CadastrarSeComponent {
  username: string = '';
  password: string = '';
  confimPassword: string = '';

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      if (params['username']) {
        this.username = params['username'];
      }
    });
  }

  cadastrarSe(): void {}
}
