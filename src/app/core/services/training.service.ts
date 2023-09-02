import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private readonly serverUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  storage = {
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
      if (!storage.includes(id)) storage.push(id);
      this.set(storage);
    },
    delete(id: number) {
      const storage: number[] = this.get();
      const newStorage = storage.filter(number => number !== id);
      this.set(newStorage);
    }
  }
}
