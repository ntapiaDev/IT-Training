import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // const authToken = this.authService.getToken();
    const authToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJuaWNvbGFzIiwiZXhwIjoxNjk1MDM4MDQzLCJpYXQiOjE2OTQ0MzgwNDMsInNjb3BlIjoiIn0.FX-WIymR3p89z0-p6JXY8CguBTPtlj1I2xg3Rsp6SoVYZoSsVZFNhpjhputX1Tz9cmeBkSereVpL7Hih9p5dug';
    if (authToken && req.url.startsWith('http://localhost:8080/')) {
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + authToken,
        },
      });
    }
    return next.handle(req);
  }
}
