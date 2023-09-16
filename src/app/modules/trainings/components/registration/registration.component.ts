import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Session } from 'src/app/core/models/Session';
import { Training } from 'src/app/core/models/Training';
import { AuthService } from 'src/app/core/services/auth.service';
import { TrainingService } from 'src/app/core/services/training.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  selectedTrainings: Training[] = [];
  session$ = this.store.select('session');
  trainings: Observable<Training[]> = this.store.select('trainings');

  constructor(private authService: AuthService, private location: Location, private store: Store<{ session: Session, trainings: Training[] }>, private trainingService: TrainingService) {
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

  redirect() {
    this.authService.setRedirect(this.location.path());
  }
}
