import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Session, UserRole } from '../models/Session';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private cookieService: CookieService) {}

  getSession(): Session {
    return {
        role: UserRole.Admin,
        token: 'jwtoken12345'
    }
  }
}
