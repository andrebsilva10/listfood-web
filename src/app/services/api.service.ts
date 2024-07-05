import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { User } from './user.service';
import { Lista } from './lista.service';
import { Produto } from './produto.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  getUserById(id: string): Observable<User | null> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`).pipe(
      catchError((error) => {
        console.error('Erro ao obter usuário:', error);
        return of(null);
      })
    );
  }

  createLista(lista: Lista): Observable<Lista> {
    return this.http.post<Lista>(`${this.apiUrl}/listas`, lista);
  }

  getListasByUserId(userId: string): Observable<Lista[]> {
    return this.http.get<Lista[]>(`${this.apiUrl}/listas?userId=${userId}`);
  }

  removeLista(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/listas/${id}`);
  }

  getListaById(id: string): Observable<Lista> {
    return this.http.get<Lista>(`${this.apiUrl}/listas/${id}`);
  }

  updateLista(id: string, lista: Lista): Observable<Lista> {
    return this.http.put<Lista>(`${this.apiUrl}/listas/${id}`, lista);
  }

  createProduto(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(`${this.apiUrl}/produtos`, produto);
  }

  getProdutosByListaId(listaId: string): Observable<Produto[]> {
    return this.http.get<Produto[]>(
      `${this.apiUrl}/produtos?listaId=${listaId}`
    );
  }

  removeProduto(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/produtos/${id}`);
  }

  getProdutoById(id: string): Observable<Produto> {
    return this.http.get<Produto>(`${this.apiUrl}/produtos/${id}`);
  }

  updateProduto(id: string, produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${this.apiUrl}/produtos/${id}`, produto);
  }

  updateUser(id: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${id}`, user);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, user);
  }
}
