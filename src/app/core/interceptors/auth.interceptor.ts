import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { server_url } from '../services/server';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.getToken();
    if (authToken && req.url.startsWith(server_url)) {
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + authToken,
        },
      });
    }
    return next.handle(req);
  }
}
