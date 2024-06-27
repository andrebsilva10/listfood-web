import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());

  constructor(
    private apiService: ApiService,
    private storageService: StorageService
  ) {}

  login(username: string, password: string): Observable<boolean> {
    return this.apiService.getAllUsers().pipe(
      map((users) => {
        const user = users.find(
          (u) => u.username === username && u.password === password
        );
        if (user) {
          this.storageService.setItem('eh_logado', 'true');
          this.storageService.setItem('userId', user.id.toString());
          this.loggedInSubject.next(true);
          return true;
        } else {
          this.logout();
          return false;
        }
      })
    );
  }

  logout(): void {
    this.storageService.setItem('eh_logado', 'false');
    this.storageService.removeItem('userId');
    this.loggedInSubject.next(false);
  }

  isLoggedIn(): boolean {
    return this.storageService.getItem('eh_logado') === 'true';
  }

  getLoggedInStatus(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }
}
