import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private readonly serverUrl = 'http://localhost:8080';

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  storage = {
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
      } else {
        this.toastr.error('Vous êtes déjà inscrit pour cette session de formation!');
      }
    },
    delete(id: number) {
      const storage: number[] = this.get();
      const newStorage = storage.filter(number => number !== id);
      this.set(newStorage);
      this.toastr.success('Cette formation a bien été supprimée.');
    }
  }
}
