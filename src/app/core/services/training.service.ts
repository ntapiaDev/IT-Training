import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { Training } from '../models/Training';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private readonly serverUrl = 'http://localhost:8080';

  constructor(private http: HttpClient, private store: Store, private toastr: ToastrService) { }

  getAll(): Training[] {
    return [
      {
        id: 1,
        name: "Java",
        reference: "C28GO",
        description: "Langage de programmation polyvalent et orienté objet, apprécié pour sa portabilité et sa performance. Il est utilisé pour créer diverses applications, des logiciels embarqués aux applications d'entreprise complexes.",
        icon: "java",
        theme_id: 1,
        days: 57,
        price: 8000,
        remote: false
      },
      {
        id: 2,
        name: "PHP",
        reference: "K92FE",
        description: "Langage de script côté serveur conçu pour le développement web dynamique. Il permet la création de sites interactifs en se connectant aux bases de données.",
        icon: "php",
        theme_id: 1,
        days: 35,
        price: 5500,
        remote: false
      },
      {
        id: 3,
        name: "Python",
        reference: "T57LQ",
        description: "Langage de programmation polyvalent, axé sur la lisibilité et la simplicité. Il est largement utilisé pour le développement rapide d'applications, l'analyse de données, l'IA et l'automatisation, avec une vaste gamme de bibliothèques disponibles.",
        icon: "python",
        theme_id: 1,
        days: 5,
        price: 1500,
        remote: true
      },
    ]
  }

  storage = {
    store: this.store,
    toastr: this.toastr,
    get(): number[] {
      return JSON.parse(localStorage.getItem('trainings') || '[]');
    },
    set(value: number[]) {
      localStorage.setItem('trainings', JSON.stringify(value));
    },
    remove() {
      return localStorage.removeItem('trainings');
    },
    add(id: number) {
      const storage: number[] = this.get();
      if (!storage.includes(id)) {
        storage.push(id);
        this.set(storage);
        this.toastr.success('Cette formation a bien été ajoutée.');
        this.store.dispatch({ type: '[Session] Increment Cart' });
      } else {
        this.toastr.error('Vous êtes déjà inscrit pour cette session de formation!');
      }
    },
    delete(id: number) {
      const storage: number[] = this.get();
      const newStorage = storage.filter(number => number !== id);
      this.set(newStorage);
      this.toastr.success('Cette formation a bien été supprimée.');
      this.store.dispatch({ type: '[Session] Decrement Cart' });
    },
    getSize(): number {
      return this.get().length;
    }
  }
}
