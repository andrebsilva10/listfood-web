import { Component } from '@angular/core';
import { FormComponent } from '../shared/form/form.component';
import { InputTextComponent } from '../shared/input-text/input-text.component';
import { ButtonPrimaryComponent } from '../shared/button-primary/button-primary.component';

@Component({
  selector: 'app-cadastro-lista',
  standalone: true,
  imports: [FormComponent, InputTextComponent, ButtonPrimaryComponent],
  templateUrl: './cadastro-lista.component.html',
  styleUrl: './cadastro-lista.component.scss',
})
export class CadastroListaComponent {
  cadastrarLista() {}
}
