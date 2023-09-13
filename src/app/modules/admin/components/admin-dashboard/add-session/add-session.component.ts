import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Center } from 'src/app/core/models/Center';
import { Training } from 'src/app/core/models/Training';
import { TrainingSession } from 'src/app/core/models/TrainingSession';
import { Former } from 'src/app/core/models/User';
import { TrainingSessionService } from 'src/app/core/services/trainingSession.service';

@Component({
  selector: 'app-add-session',
  templateUrl: './add-session.component.html',
  styleUrls: ['./add-session.component.scss'],
})
export class AddSessionComponent {
  @Output() sessionAdded = new EventEmitter<void>();

  modaleAction= '';
  modaleIsOpen = false;

  form: FormGroup;
  centers$ = this.store.select('centers');
  formers$ = this.store.select('formers');
  trainings$ = this.store.select('trainings');
  
  startDate?: Date;
  duration?: number;
  endDate?: any;

  constructor(private formBuilder: FormBuilder, private store: Store<{ centers: Center[], formers: Former[], trainings: Training[] }>, private sessionService: TrainingSessionService, private toastr: ToastrService) {
    this.form = this.formBuilder.group({
      formation_id: [0, Validators.required],
      type: ['', Validators.required],
      dateDebut: [new Date(), Validators.required],
      duree: [0, Validators.required],
      dateFin: [new Date(), Validators.required],
      centre_id: [0, Validators.required],
      referent_id: [0, Validators.required],
      nombreParticipants: [0, Validators.required],
      remote: [false, Validators.required],
      prix: [0, Validators.required]
    });
  }

  setDurationAndPrice() {
    const id = parseInt(this.form.value.formation_id);
    this.store.select('trainings').subscribe(trainings => {
      const training = trainings.find(t => t.id === id);
      this.form.patchValue({ duree: training!.duree })
      this.form.patchValue({ prix: training!.prix })
    })    
  }

  getEndDate = (start: Date, duration: number) => {
    const date: Date = new Date(start);
    const isWeekend = (date: Date) => [0, 6].includes(date.getDay());
    while (duration > 0) {
      date.setDate(date.getDate() + 1);
      if (!isWeekend(date)) duration--;
    }
    return date;
  };

  formatEndDate() {
    if (this.startDate && this.duration) {
      const endDate = this.getEndDate(this.startDate, this.duration);
      const day = endDate.getDate().toString().padStart(2, '0');
      const month = (endDate.getMonth() + 1).toString().padStart(2, '0')
      const year = endDate.getFullYear().toString();
      this.endDate = `${year}-${month}-${day}`;
    }
  }

  submit() {
    if (this.form.invalid) {
      this.toastr.error('Merci de remplir tous les champs!');
      return;
    }
    let training!: Training;
    this.store.select('trainings').subscribe(trainings => training = trainings.find(t => t.id == this.form.value.formation_id)!);
    let center!: Center;
    this.store.select('centers').subscribe(centers => center = centers.find(c => c.id == this.form.value.centre_id)!);
    let former!: Former;
    this.store.select('formers').subscribe(formers => former = formers.find(f => f.id == this.form.value.formateur_id)!);

    const newSession: TrainingSession = this.form.value;
    newSession.formation = training;
    newSession.centre = center;
    newSession.formateur = former;

    this.sessionService.add(this.form.value).subscribe({
      next: (data) => {
        this.store.dispatch({ type: '[sessions] Ajouter sessions', data });
        this.toastr.success('Session ajouté avec succès!');
        this.form.reset();
        this.sessionAdded.emit();
      },
      error: () => {
        this.toastr.success("Erreur lors de l'ajout d'une session!");    
      }
    });
  }

  toggleModale(action: string) {
    this.modaleAction = action;
    this.modaleIsOpen = !this.modaleIsOpen;
  }
}
