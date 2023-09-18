import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { TrainingSessionService } from './trainingSession.service';
import { Session } from '../models/Session';
import { server_url } from './server';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly serverUrl = `${server_url}/auth`;

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router, private trainingSessionService: TrainingSessionService) { }

  login(email: string, password: string) {
    return this.http.post(`${this.serverUrl}/login`, { username: email, password });
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
    // this.cookieService.delete('JWT');
    document.cookie = 'JWT=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  register(email: string, password: string) {
    return this.http.post(`${this.serverUrl}/create-user`, { username: email, password });
  }

  getSession(): Observable<Session> {
    return this.http.get<any>(`${this.serverUrl}/profil`).pipe(
      map(user => {
        const role = user?.tokenAttributes.scope;
        return {
          role,
          email: user?.name,
          token: this.getToken() ?? '',
          cart: this.trainingSessionService.storage.getSize()
        };
      })
    );
  }

  getProfil() {
    return this.http.get<any>(`${this.serverUrl}/profil`);
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
