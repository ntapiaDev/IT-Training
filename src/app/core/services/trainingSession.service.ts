import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TrainingSession } from '../models/TrainingSession';

@Injectable({
  providedIn: 'root'
})
export class TrainingSessionService {
  private readonly serverUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getAll(): TrainingSession[] {
    return [
      {
        id: 1,
        name: "Java - Rouen",
        formation_id: 1,
        date: 16
      },
      {
        id: 2,
        name: "Java - Paris",
        formation_id: 1,
        date: 16
      },
      {
        id: 3,
        name: "PHP - Rouen",
        formation_id: 2,
        date: 16
      },
    ]
  }
}
