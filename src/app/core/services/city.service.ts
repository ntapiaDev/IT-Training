import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { City } from '../models/Address';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private readonly serverUrl = 'http://localhost:8080/villes';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<City[]>(this.serverUrl);
  }

  add(city: City) {
    return this.http.post(this.serverUrl, city, this.httpOptions);
  }

  update(city: City) {
    return this.http.put(`${this.serverUrl}/${city.id}`, city, this.httpOptions);
  }

  delete(id: number) {
    return this.http.delete(`${this.serverUrl}/${id}`);
  }
}
