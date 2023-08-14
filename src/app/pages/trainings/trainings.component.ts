import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Training } from 'src/app/stores/trainings/Training';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.scss']
})
export class TrainingsComponent {
  trainings$: Observable<Training[]> = this.store.select('trainings');

  constructor(private store: Store<{ trainings: Training[] }>) { }
}
