import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Center } from '../models/Center';
import { server_url } from './server';

@Injectable({
  providedIn: 'root'
})
export class CenterService {
  private readonly serverUrl = `${server_url}/centres`;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Center[]>(this.serverUrl);
  }

  add(center: Center) {
    return this.http.post(this.serverUrl, center, this.httpOptions);
  }

  update(center: Center) {
    return this.http.put(`${this.serverUrl}/${center.id}`, center, this.httpOptions);
  }

  delete(id: number) {
    return this.http.delete(`${this.serverUrl}/${id}`);
  }
}
