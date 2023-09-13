import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Former } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class FormerService {
  private readonly serverUrl = 'http://localhost:8080/formateurs';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Former[]>(`${this.serverUrl}/list`);
  }

  add(former: Former) {
    return this.http.post(`${this.serverUrl}/create`, former, this.httpOptions);
  }

  update(former: Former) {
    return this.http.put(`${this.serverUrl}/${former.id}`, former, this.httpOptions);
  }

  delete(id: number) {
    return this.http.delete(`${this.serverUrl}/${id}`);
  }
}
