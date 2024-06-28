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
}
