import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Training } from '../models/Training';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private readonly serverUrl = 'http://localhost:8080/formations';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Training[]>(this.serverUrl);
  }

  add(training: Training) {
    return this.http.post(this.serverUrl, training, this.httpOptions);
  }

  update(training: Training) {
    return this.http.put(`${this.serverUrl}/${training.id}`, training, this.httpOptions);
  }

  delete(id: number) {
    return this.http.delete(`${this.serverUrl}/${id}`);
  }
}
