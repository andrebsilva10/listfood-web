import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FormComponent } from '../../shared/form/form.component';
import { InputTextComponent } from '../../shared/input-text/input-text.component';
import { ButtonPrimaryComponent } from '../../shared/button-primary/button-primary.component';
import { ListaService } from '../../../services/lista.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-cadastro-lista',
  standalone: true,
  imports: [
    FormComponent,
    InputTextComponent,
    ButtonPrimaryComponent,
    FormsModule,
  ],
  templateUrl: './cadastro-lista.component.html',
  styleUrls: ['./cadastro-lista.component.scss'],
})
export class CadastroListaComponent {
  nomeLista: string = '';
  saldoLista: string = '';

  constructor(
    private listaService: ListaService,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  cadastrarLista() {
    this.userService.getCurrentUser().subscribe((user) => {
      if (user) {
        const saldoNumerico = this.convertToNumber(this.saldoLista);
        if (isNaN(saldoNumerico)) {
          this.toastr.error('Saldo inválido');
          return;
        }
        const novaLista = {
          nome: this.nomeLista,
          saldo: saldoNumerico,
          userId: user.id,
        };

        this.listaService.createLista(novaLista).subscribe(() => {
          this.toastr.success('Lista cadastrada com sucesso!');
          this.router.navigate(['/listas']);
        });
      } else {
        this.toastr.error('Usuário não está logado.');
      }
    });
  }

  onSaldoListaChange(value: string) {
    this.saldoLista = value;
  }

  private convertToNumber(value: string): number {
    const cleanedValue = value.replace(/[^\d,]/g, '').replace(',', '.');
    return parseFloat(cleanedValue);
  }
}
