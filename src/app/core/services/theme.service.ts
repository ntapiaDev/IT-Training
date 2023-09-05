import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Theme } from '../models/Theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly serverUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getAll(): Theme[] {
    return [
      {
        id: 1,
        name: "Langages de programmation",
        icon: "langages"
      },
      {
        id: 2,
        name: "Bases de données",
        icon: "bases"
      },
      {
        id: 3,
        name: "No-Code",
        icon: "no-code"
      },
      {
        id: 4,
        name: "Sécurité informatique",
        icon: "securite"
      },
      {
        id: 5,
        name: "Réseau",
        icon: "reseau"
      }
    ]
  }
}
