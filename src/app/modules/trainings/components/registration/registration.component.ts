import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  registerForm: FormGroup;
  trainingsList: Observable<Training[]> = this.store.select('trainings');
  trainings: Training[] = [];
  selectedTraining: string = '';
  formTarget: string = 'particulier';

  constructor(private store: Store<{ trainings: Training[] }>, private trainingService: TrainingService) {
    // Récupérer les infos du user si il y a une session
    this.registerForm = new FormGroup({
      lastName: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
      adresse: new FormControl('', [Validators.required]),
      code: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required])
    });
    this.loadTrainings();
  }

  loadTrainings() {
    this.store.select('trainings').subscribe(trainings => {
      this.trainings = trainings.filter(training => this.trainingService.storage.get().includes(training.id));
    })
  }

  filterTrainings(training: Training): boolean {
    const match = training.name.toLowerCase().includes(this.selectedTraining.toLowerCase());
    const alreadySelected = this.trainings.some(t => t.id === training.id);
    return match && !alreadySelected;
  }

  addTraining(id: number) {
    this.trainingService.storage.add(id);
    this.loadTrainings();
    this.selectedTraining = '';
  }

  deleteTraining(id: number) {
    this.trainingService.storage.delete(id);
    this.loadTrainings();
  }

  apply(target: string) {
    this.formTarget = target;
    if (this.formTarget === 'entreprise') {
      this.registerForm.addControl('company', new FormControl('', [Validators.required]));
      this.registerForm.addControl('business', new FormControl('', [Validators.required]));
      this.registerForm.addControl('size', new FormControl('', [Validators.required]));
      this.registerForm.addControl('position', new FormControl('', [Validators.required]));
    } else {
      this.registerForm.removeControl('company');
      this.registerForm.removeControl('business');
      this.registerForm.removeControl('size');
      this.registerForm.removeControl('position');
    }
  }

  register() {
    //Ajouter les id des formations choisies
    console.log(this.registerForm.value);
  }
}
