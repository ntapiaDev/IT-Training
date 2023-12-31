import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Area } from '../models/Area';
import { server_url } from './server';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  private readonly serverUrl = `${server_url}/domaines`;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Area[]>(this.serverUrl);
  }

  add(area: any) {
    return this.http.post(this.serverUrl, area, this.httpOptions);
  }

  update(area: any) {
    return this.http.put(`${this.serverUrl}/${area.id}`, area, this.httpOptions);
  }

  delete(id: number) {
    return this.http.delete(`${this.serverUrl}/${id}`);
  }
}
