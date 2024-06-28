import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface Produto {
  id?: string;
  nome: string;
  valor: number;
  quantidade: number;
  listaId: string;
  selecionado?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  constructor(private apiService: ApiService) {}

  createProduto(produto: Produto): Observable<Produto> {
    return this.apiService.createProduto(produto);
  }

  getProdutosByListaId(listaId: string): Observable<Produto[]> {
    return this.apiService.getProdutosByListaId(listaId);
  }

  removeProduto(id: string): Observable<void> {
    return this.apiService.removeProduto(id);
  }

  getProdutoById(id: string): Observable<Produto> {
    return this.apiService.getProdutoById(id);
  }

  updateProduto(id: string, produto: Produto): Observable<Produto> {
    return this.apiService.updateProduto(id, produto);
  }
}
