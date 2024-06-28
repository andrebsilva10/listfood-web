import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Lista } from './lista.service';

@Injectable({
  providedIn: 'root',
})
export class EstadoListaService {
  private listasSubject = new BehaviorSubject<Lista[]>([]);
  listas$ = this.listasSubject.asObservable();

  atualizarListas(listas: Lista[]) {
    this.listasSubject.next(listas);
  }

  atualizarLista(listaAtualizada: Lista) {
    const listasAtuais = this.listasSubject.value;
    const listasAtualizadas = listasAtuais.map((lista) =>
      lista.id === listaAtualizada.id ? listaAtualizada : lista
    );
    this.listasSubject.next(listasAtualizadas);
  }

  getLista(id: string): Lista | undefined {
    return this.listasSubject.value.find((lista) => lista.id === id);
  }
}
