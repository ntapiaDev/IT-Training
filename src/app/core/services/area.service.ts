import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Area } from '../models/Area';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  private readonly serverUrl = 'http://localhost:8080/themes';

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Area[]>(this.serverUrl);
  }
}
