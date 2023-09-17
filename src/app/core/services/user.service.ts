import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly serverUrl = 'http://localhost:8080/candidats';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  httpOptionsText ={
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    responseType: 'text' as 'json'
  };

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(`${this.serverUrl}/list`);
  }

  add(user: User) {
    return this.http.post(`${this.serverUrl}/create`, user, this.httpOptions);
  }

  convert(user: User) {
    return this.http.post(`${this.serverUrl}/convert`, user, this.httpOptions);
  }

  update(user: User) {
    return this.http.put(`${this.serverUrl}/${user.id}`, user, this.httpOptions);
  }

  delete(id: number) {
    return this.http.delete(`${this.serverUrl}/${id}`);
  }

  validate(username: string) {
    return this.http.post(`${this.serverUrl}/validate`, { username }, this.httpOptionsText);
  }

  invalidate(username: string) {
    return this.http.post(`${this.serverUrl}/invalidate`, { username }, this.httpOptionsText);
  }
}
