import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Training } from 'src/app/core/models/Training';
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
  trainings$ = this.store.select('trainings');
  
  startDate?: Date;
  duration?: number;
  endDate?: any;

  constructor(private formBuilder: FormBuilder, private store: Store<{ trainings: Training[] }>, private sessionService: TrainingSessionService, private toastr: ToastrService) {
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

  setDuration() {
    const id = parseInt(this.form.value.formation_id);
    this.store.select('trainings').subscribe(trainings => {
      const training = trainings.find(t => t.id === id);
      this.form.patchValue({ duree: training!.duree })
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
