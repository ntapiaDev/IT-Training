import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly serverUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }
}