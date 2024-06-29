import { Component, OnInit } from '@angular/core';
import { ListaService, Lista } from '../../../services/lista.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CurrencyFormatPipe } from '../../../pipes/currency-format';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../services/user.service';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyFormatPipe],
  host: {
    class: 'w-full',
  },
})
export class ListasComponent implements OnInit {
  listas: Lista[] = [];
  listaParaRemover: Lista | null = null;

  constructor(
    private listaService: ListaService,
    private toastrService: ToastrService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.listaService.listas$.subscribe((listas) => {
      this.listas = listas;
    });
    this.carregarListas();
  }

  carregarListas() {
    this.userService
      .getCurrentUser()
      .pipe(
        switchMap((user) => {
          if (user && user.id) {
            return this.listaService.getListasByUserId(user.id);
          } else {
            this.toastrService.error('Usuário não encontrado');
            return of([]);
          }
        })
      )
      .subscribe(
        (listas) => {
          const listasAtualizadas = listas.map((lista) => ({
            ...lista,
            valorDisponivel:
              lista.valorDisponivel !== undefined
                ? lista.valorDisponivel
                : lista.saldo,
          }));
          listasAtualizadas.forEach((listaAtualizada) => {
            this.listaService.atualizarListaLocal(listaAtualizada);
          });
        },
        (error) => {
          this.toastrService.error('Erro ao carregar listas');
          console.error('Erro ao carregar listas:', error);
        }
      );
  }

  abrirModalRemover(lista: Lista) {
    this.listaParaRemover = lista;
    const modal = document.getElementById('modal-remover') as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  }

  confirmarRemover() {
    if (this.listaParaRemover && this.listaParaRemover.id) {
      this.listaService.removeLista(this.listaParaRemover.id).subscribe(
        () => {
          this.carregarListas();
          this.fecharModalRemover();
          this.toastrService.success('Lista removida com sucesso');
        },
        (error) => {
          this.toastrService.error('Erro ao remover lista');
          console.error('Erro ao remover lista:', error);
        }
      );
    }
  }

  fecharModalRemover() {
    this.listaParaRemover = null;
    const modal = document.getElementById('modal-remover') as HTMLDialogElement;
    if (modal) {
      modal.close();
    }
  }
}
