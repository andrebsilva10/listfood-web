import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { tap } from 'rxjs/operators';

export interface Lista {
  id?: string;
  nome: string;
  saldo: number;
  userId: string;
  valorDisponivel?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ListaService {
  private listasSubject = new BehaviorSubject<Lista[]>([]);
  listas$ = this.listasSubject.asObservable();

  constructor(private apiService: ApiService) {}

  createLista(lista: Lista): Observable<Lista> {
    return this.apiService.createLista(lista).pipe(
      tap((novaLista) => {
        const listas = this.listasSubject.value;
        this.listasSubject.next([...listas, novaLista]);
      })
    );
  }

  getListasByUserId(userId: string): Observable<Lista[]> {
    return this.apiService.getListasByUserId(userId).pipe(
      tap((listas) => {
        this.listasSubject.next(listas);
      })
    );
  }

  removeLista(id: string): Observable<void> {
    return this.apiService.removeLista(id).pipe(
      tap(() => {
        const listas = this.listasSubject.value.filter(
          (lista) => lista.id !== id
        );
        this.listasSubject.next(listas);
      })
    );
  }

  getListaById(id: string): Observable<Lista> {
    return this.apiService.getListaById(id);
  }

  updateLista(id: string, lista: Lista): Observable<Lista> {
    return this.apiService.updateLista(id, lista).pipe(
      tap((listaAtualizada) => {
        const listas = this.listasSubject.value;
        const index = listas.findIndex((l) => l.id === id);
        if (index !== -1) {
          listas[index] = listaAtualizada;
          this.listasSubject.next([...listas]);
        }
      })
    );
  }

  atualizarListaLocal(listaAtualizada: Lista) {
    const listas = this.listasSubject.value;
    const index = listas.findIndex((l) => l.id === listaAtualizada.id);
    if (index !== -1) {
      listas[index] = listaAtualizada;
      this.listasSubject.next([...listas]);
    }
  }

  getLista(id: string): Lista | undefined {
    return this.listasSubject.value.find((lista) => lista.id === id);
  }
}
