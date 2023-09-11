import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TrainingSession } from '../models/TrainingSession';

@Injectable({
  providedIn: 'root'
})
export class TrainingSessionService {
  private readonly serverUrl = 'http://localhost:8080/sessions';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<TrainingSession[]>(this.serverUrl);
  }

  add(trainingSession: TrainingSession) {
    return this.http.post(this.serverUrl, trainingSession, this.httpOptions);
  }

  update(trainingSession: TrainingSession) {
    return this.http.put(`${this.serverUrl}/${trainingSession.id}`, trainingSession, this.httpOptions);
  }

  delete(id: number) {
    return this.http.delete(`${this.serverUrl}/${id}`);
  }
}
