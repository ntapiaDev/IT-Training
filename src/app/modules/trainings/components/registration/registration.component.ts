import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Training } from 'src/app/core/models/Training';
import { TrainingService } from 'src/app/core/services/training.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  selectedTrainings: Training[] = [];
  trainings: Observable<Training[]> = this.store.select('trainings');

  constructor(private store: Store<{ trainings: Training[] }>, private trainingService: TrainingService) {
    this.loadTrainings();
  }

  loadTrainings() {
    this.trainings.subscribe(trainings => {
      this.selectedTrainings = trainings.filter(training => this.trainingService.storage.get().includes(training.id));
    })
  }

  addTraining(id: number) {
    this.trainingService.storage.add(id);
    this.loadTrainings();
  }

  deleteTraining(id: number) {
    this.trainingService.storage.delete(id);
    this.loadTrainings();
  }
}
