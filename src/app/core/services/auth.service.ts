import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { TrainingService } from './training.service';
import { Session } from '../models/Session';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly serverUrl = 'http://localhost:8080';

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router, private trainingService: TrainingService) { }

  login(email: string, password: string) {
    return this.http.post(`${this.serverUrl}/auth/login`, { username: email, password });
  }

  setToken(token: string): void {
    const expiredDate = new Date();
    expiredDate.setDate(expiredDate.getDate() + 365);
    this.cookieService.set('JWT', token, expiredDate);
  }

  getToken(): string | null {
    return this.cookieService.get('JWT');
  }

  logout(): void {
    this.cookieService.delete('JWT');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  register(email: string, password: string) {
    return this.http.post(`${this.serverUrl}/auth/create-user`, { username: email, password });
  }

  getSession(): Observable<Session> {
    return this.http.get<any>(`${this.serverUrl}/auth/profil`).pipe(
      map(user => {
        const role = user?.tokenAttributes.scope;
        return {
          role,
          token: this.getToken() ?? '',
          cart: this.trainingService.storage.getSize()
        };
      })
    );
  }

  setRedirect(url: string) {
    this.cookieService.set('redirect', url);
  }

  getRedirect() {
    const url = this.cookieService.get('redirect');
    if (url) {
      this.cookieService.delete('redirect');
      this.router.navigate([decodeURIComponent(url)]);
      return true;
    } else return false;
  }
}
