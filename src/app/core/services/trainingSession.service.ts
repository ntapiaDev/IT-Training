import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
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

  constructor(private http: HttpClient, private store: Store, private toastr: ToastrService) { }

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

  storage = {
    store: this.store,
    toastr: this.toastr,
    get(): number[] {
      return JSON.parse(localStorage.getItem('sessions') || '[]');
    },
    set(value: number[]) {
      localStorage.setItem('sessions', JSON.stringify(value));
    },
    remove() {
      return localStorage.removeItem('sessions');
    },
    add(id: number) {
      let storage = this.get();
      if (storage.length === 0) this.store.dispatch({ type: '[Session] Increment Cart' });
      if (!storage.includes(id)) {
        storage = [id];
        this.set(storage);
        this.toastr.success('Cette session a bien été ajoutée.');
      } else {
        this.toastr.error('Vous êtes déjà inscrit pour cette session de formation!');
      }
    },
    delete(id: number, toastr: boolean = true) {
      this.set([]);
      this.store.dispatch({ type: '[Session] Decrement Cart' });
      if (toastr) this.toastr.success('Cette session a bien été supprimée.');
    },
    getSize(): number {
      return this.get().length;
    }
  }
}
