import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface Lista {
  id?: string;
  nome: string;
  saldo: number;
  userId: string;
}

@Injectable({
  providedIn: 'root',
})
export class ListaService {
  constructor(private apiService: ApiService) {}

  createLista(lista: Lista): Observable<Lista> {
    return this.apiService.createLista(lista);
  }

  getListasByUserId(userId: string): Observable<Lista[]> {
    return this.apiService.getListasByUserId(userId);
  }

  removeLista(id: string): Observable<void> {
    return this.apiService.removeLista(id);
  }

  getListaById(id: string): Observable<Lista> {
    return this.apiService.getListaById(id);
  }

  updateLista(id: string, lista: Lista): Observable<Lista> {
    return this.apiService.updateLista(id, lista);
  }
}
