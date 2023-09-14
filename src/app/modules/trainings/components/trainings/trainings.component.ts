import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Training } from 'src/app/core/models/Training';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.scss']
})
export class TrainingsComponent {
  city: string = '';
  filterMap: string[] = [];
  filterValue = '';
  trainings: Training[] = [];

  constructor(private store: Store<{ trainings: Training[] }>) { }

  ngOnInit() {
    this.store.select('trainings').subscribe(trainings => this.trainings = trainings);
  }

  filter(e: Event) {
    const inputElement = e.target as HTMLInputElement;
    this.filterValue = inputElement.value;
  }

  filterFromMap(trainings: Training[]) {
    if (this.filterMap.length === 0) return trainings;
    else return trainings.filter(training => this.filterMap.includes(training.nom));
  }

  mapFilter(data: { city: string, trainings: string[] }) {
    this.city = data.city
    this.filterMap = data.trainings;
  }
}
