import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FormComponent } from '../../shared/form/form.component';
import { InputTextComponent } from '../../shared/input-text/input-text.component';
import { ButtonPrimaryComponent } from '../../shared/button-primary/button-primary.component';
import { ProdutoService, Produto } from '../../../services/produto.service';
import { convertToNumber } from '../../../utils/number-utils';

@Component({
  selector: 'app-cadastro-produto',
  standalone: true,
  imports: [
    FormComponent,
    InputTextComponent,
    ButtonPrimaryComponent,
    FormsModule,
  ],
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.scss'],
})
export class CadastroProdutoComponent implements OnInit {
  nomeProduto: string = '';
  valorProduto: string = '';
  quantidadeProduto: string = '';
  produtoId: string | null = null;
  listaId: string | null = null;
  isEditing: boolean = false;

  constructor(
    private produtoService: ProdutoService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.listaId = params['listaId'];
      if (params['id']) {
        this.produtoId = params['id'];
        this.isEditing = true;
        if (this.produtoId) this.carregarProduto(this.produtoId);
      }
    });
  }

  carregarProduto(id: string) {
    this.produtoService.getProdutoById(id).subscribe(
      (produto: Produto) => {
        this.nomeProduto = produto.nome;
        this.valorProduto = produto.valor.toString().replace('.', ',');
        this.quantidadeProduto = produto.quantidade.toString();
      },
      (error) => {
        this.toastr.error('Erro ao carregar produto');
        console.error('Erro ao carregar produto:', error);
      }
    );
  }

  salvarProduto() {
    if (!this.listaId) {
      this.toastr.error('Lista não especificada');
      return;
    }

    const valorNumerico = convertToNumber(this.valorProduto);
    if (isNaN(valorNumerico)) {
      this.toastr.error('Valor inválido');
      return;
    }

    const quantidadeNumerica = parseInt(this.quantidadeProduto, 10);
    if (isNaN(quantidadeNumerica)) {
      this.toastr.error('Quantidade inválida');
      return;
    }

    const produtoData: Produto = {
      nome: this.nomeProduto,
      valor: valorNumerico,
      quantidade: quantidadeNumerica,
      listaId: this.listaId,
    };

    if (this.isEditing && this.produtoId) {
      this.produtoService.updateProduto(this.produtoId, produtoData).subscribe(
        () => {
          this.toastr.success('Produto atualizado com sucesso!');
          this.router.navigate(['/detalhes-lista', this.listaId]);
        },
        (error) => {
          this.toastr.error('Erro ao atualizar produto');
          console.error('Erro ao atualizar produto:', error);
        }
      );
    } else {
      this.produtoService.createProduto(produtoData).subscribe(
        () => {
          this.toastr.success('Produto cadastrado com sucesso!');
          this.router.navigate(['/detalhes-lista', this.listaId]);
        },
        (error) => {
          this.toastr.error('Erro ao cadastrar produto');
          console.error('Erro ao cadastrar produto:', error);
        }
      );
    }
  }
}
