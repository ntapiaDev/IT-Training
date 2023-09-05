import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Theme } from '../models/Theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly serverUrl = 'http://localhost:8080/sousthemes';

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Theme[]>(this.serverUrl);
  }
}
