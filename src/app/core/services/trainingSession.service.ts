import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TrainingSession } from '../models/TrainingSession';

@Injectable({
  providedIn: 'root'
})
export class TrainingSessionService {
  private readonly serverUrl = 'http://localhost:8080/sessions';

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<TrainingSession[]>(this.serverUrl);
  }
}
