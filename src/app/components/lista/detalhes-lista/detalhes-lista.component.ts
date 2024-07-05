import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ProdutoService, Produto } from '../../../services/produto.service';
import { ListaService, Lista } from '../../../services/lista.service';
import { CurrencyFormatPipe } from '../../../pipes/currency-format';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detalhes-lista',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyFormatPipe, FormsModule],
  templateUrl: './detalhes-lista.component.html',
  styleUrls: ['./detalhes-lista.component.scss'],
  host: {
    class: 'w-full',
  },
})
export class DetalhesListaComponent implements OnInit {
  produtos: Produto[] = [];
  lista: Lista | null = null;
  produtoParaRemover: Produto | null = null;
  valorTotal: number = 0;
  valorDisponivel: number = 0;

  constructor(
    private route: ActivatedRoute,
    private produtoService: ProdutoService,
    private listaService: ListaService,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const listaId = params['id'];
      if (listaId) {
        const listaDoEstado = this.listaService.getLista(listaId);
        if (listaDoEstado) {
          this.lista = listaDoEstado;
          this.valorDisponivel = this.lista.valorDisponivel ?? this.lista.saldo;
        } else {
          this.carregarLista(listaId);
        }
        this.carregarProdutos(listaId);
      }
    });
  }

  carregarLista(listaId: string) {
    this.listaService.getListaById(listaId).subscribe(
      (lista) => {
        this.lista = {
          ...lista,
          valorDisponivel:
            lista.valorDisponivel !== undefined
              ? lista.valorDisponivel
              : lista.saldo,
        };
        this.valorDisponivel = this.lista.valorDisponivel ?? this.lista.saldo;
        this.calcularValorDisponivel();
      },
      (error) => {
        this.toastrService.error('Erro ao carregar detalhes da lista');
        console.error('Erro ao carregar detalhes da lista:', error);
      }
    );
  }

  carregarProdutos(listaId: string) {
    this.produtoService.getProdutosByListaId(listaId).subscribe(
      (produtos) => {
        this.produtos = produtos.filter((p) => p.listaId === listaId);
        this.calcularValorTotal();
      },
      (error) => {
        this.toastrService.error('Erro ao carregar produtos');
        console.error('Erro ao carregar produtos:', error);
      }
    );
  }

  abrirModalRemover(produto: Produto) {
    this.produtoParaRemover = produto;
    const modal = document.getElementById('modal-remover') as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  }

  confirmarRemover() {
    if (this.produtoParaRemover && this.produtoParaRemover.id) {
      this.produtoService.removeProduto(this.produtoParaRemover.id).subscribe(
        () => {
          this.carregarProdutos(this.lista!.id!);
          this.fecharModalRemover();
          this.toastrService.success('Produto removido com sucesso');

          this.calcularValorDisponivel();
        },
        (error) => {
          this.toastrService.error('Erro ao remover produto');
          console.error('Erro ao remover produto:', error);
        }
      );
    }
  }

  fecharModalRemover() {
    this.produtoParaRemover = null;
    const modal = document.getElementById('modal-remover') as HTMLDialogElement;
    if (modal) {
      modal.close();
    }
  }

  atualizarCheckboxTodos() {
    const todosSelecionados = this.produtos.every(
      (produto) => produto.selecionado
    );
    const checkboxTodos = document.getElementById(
      'checkbox-todos'
    ) as HTMLInputElement;
    if (checkboxTodos) {
      checkboxTodos.checked = todosSelecionados;
    }
  }

  calcularValorTotal() {
    this.valorTotal = this.produtos
      .filter((produto) => produto.selecionado)
      .reduce(
        (total, produto) => total + produto.valor * produto.quantidade,
        0
      );
    this.atualizarCheckboxTodos();
    this.calcularValorDisponivel();
    this.salvarEstadoProdutos();
  }

  salvarValorDisponivel() {
    if (this.lista && this.lista.id) {
      const listaAtualizada = {
        ...this.lista,
        valorDisponivel: this.valorDisponivel,
      };
      this.listaService.updateLista(this.lista.id, listaAtualizada).subscribe(
        (listaAtualizada) => {
          this.listaService.atualizarListaLocal(listaAtualizada);
        },
        (error) => {
          console.error('Erro ao salvar valor disponível:', error);
        }
      );
    }
  }

  salvarEstadoProdutos() {
    this.produtos.forEach((produto) => {
      if (produto.id) {
        this.produtoService.updateProduto(produto.id, produto).subscribe(
          () => {},
          (error) => {
            this.toastrService.error('Erro ao salvar estado do produto');
            console.error('Erro ao salvar estado do produto:', error);
          }
        );
      }
    });
  }

  calcularValorDisponivel() {
    if (this.lista) {
      this.valorDisponivel = this.lista.saldo - this.valorTotal;

      if (this.valorDisponivel < 0) {
        if (
          !this.toastrService.toasts.some(
            (toast) =>
              toast.message ===
              'Atenção: O valor total excede o saldo disponível!'
          )
        ) {
          this.toastrService.warning(
            'Atenção: O valor total excede o saldo disponível!'
          );
        }
      }

      this.salvarValorDisponivel();
    }
  }

  toggleProduto(produto: Produto) {
    produto.selecionado = !produto.selecionado;
    this.calcularValorTotal();
    if (produto.id) {
      this.produtoService.updateProduto(produto.id, produto).subscribe(
        () => {},
        (error) => {
          this.toastrService.error('Erro ao salvar estado do produto');
          console.error('Erro ao salvar estado do produto:', error);
        }
      );
    }
  }

  toggleAll(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    this.produtos.forEach(
      (produto) => (produto.selecionado = checkbox.checked)
    );
    this.calcularValorTotal();
  }

  temProdutosSelecionados(): boolean {
    return this.produtos.some((produto) => produto.selecionado);
  }
}
