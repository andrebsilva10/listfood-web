import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  setItem(key: string, value: string, session: boolean = false): void {
    if (session) {
      sessionStorage.setItem(key, value);
      return;
    }

    localStorage.setItem(key, value);
  }

  getItem(key: string, session: boolean = false): string | null {
    if (session) {
      return sessionStorage.getItem(key);
    }

    return localStorage.getItem(key);
  }

  removeItem(key: string, session: boolean = false): void {
    if (session) {
      sessionStorage.removeItem(key);
      return;
    }

    localStorage.removeItem(key);
  }
}
