import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Area } from '../models/Area';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  private readonly serverUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getAll(): Area[] {
    return [
      {
        id: 1,
        name: "Informatique",
        icon: "informatique"
      },
      {
        id: 2,
        name: "Management",
        icon: "management"
      },
      {
        id: 3,
        name: "Ressources Humaines",
        icon: "rh"
      },
      {
        id: 4,
        name: "Finance",
        icon: "finance"
      },
      {
        id: 5,
        name: "Marketing",
        icon: "marketing"
      }
    ]
  }
}
