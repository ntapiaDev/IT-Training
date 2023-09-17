import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Theme } from '../models/Theme';
import { server_url } from './server';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly serverUrl = `${server_url}/themes`;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Theme[]>(this.serverUrl);
  }

  add(theme: Theme) {
    return this.http.post(this.serverUrl, theme, this.httpOptions);
  }

  update(theme: Theme) {
    return this.http.put(`${this.serverUrl}/${theme.id}`, theme, this.httpOptions);
  }

  delete(id: number) {
    return this.http.delete(`${this.serverUrl}/${id}`);
  }
}
