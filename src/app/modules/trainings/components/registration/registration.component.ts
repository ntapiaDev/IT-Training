import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Training } from 'src/app/core/models/Training';

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
  references: string[];
  formTarget: string = 'particulier';
  storage: string | null;

  constructor(private route: ActivatedRoute, private router: Router, private store: Store<{ trainings: Training[] }>) {
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
    this.storage = localStorage.getItem('trainings');
    if (this.storage?.length && this.storage?.length > 2) {
      this.references = JSON.parse(this.storage);
      const references = this.references.join('&');
      this.router.navigate([`formations/inscription/${references}`]);
    } else {
      this.references = this.route.snapshot.params['reference']?.split('&') ?? [];
      localStorage.setItem('trainings', JSON.stringify(this.references));
    }
    this.loadTrainings();    
  }

  loadTrainings() {
    this.store.select('trainings').subscribe(trainings => {
      this.trainings = trainings.filter(training => this.references?.includes(training.reference));
    })
  }

  filterTrainings(training: Training): boolean {
    const match = training.name.toLowerCase().includes(this.selectedTraining.toLowerCase());
    const alreadySelected = this.trainings.some(t => t.id === training.id);
    return match && !alreadySelected;
  }

  addTraining(ref: string) {
    const references = this.route.snapshot.params['reference']?.concat('&') ?? '';
    this.references.push(ref);
    localStorage.setItem('trainings', JSON.stringify(this.references));
    this.loadTrainings();
    this.selectedTraining = '';
    this.router.navigate([`formations/inscription/${references + ref}`]);
  }

  deleteTraining(ref: string) {
    const references = this.route.snapshot.params['reference'].slice(0, -6);
    this.references = this.references.filter(r => r !== ref);
    this.loadTrainings();
    this.selectedTraining = '';
    const storage: string[] = JSON.parse(this.storage || '');
    const newStorage: string = JSON.stringify(storage.filter(item => item !== ref));
    localStorage.setItem('trainings', newStorage);
    this.router.navigate([`formations/inscription/${references}`]);
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
    //Ajouter les références
    console.log(this.registerForm.value);
  }
}
