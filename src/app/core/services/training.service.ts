import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
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

  constructor(private http: HttpClient, private store: Store, private toastr: ToastrService) { }

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
