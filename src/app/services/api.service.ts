import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { User } from './user.service';
import { Lista } from './lista.service';

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
}
