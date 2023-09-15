import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() sessionToEdit?: TrainingSession;
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
      id: [0],
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

  ngOnInit() {
    if (this.sessionToEdit) {
      this.startDate = this.sessionToEdit.dateDebut;
      this.endDate = this.sessionToEdit.dateFin;
      this.duration = this.sessionToEdit.duree;

      this.form.patchValue({
        id: this.sessionToEdit.id,
        formation_id: this.sessionToEdit.formation.id,
        type: this.sessionToEdit.type,
        centre_id: this.sessionToEdit.centre.id,
        referent_id: this.sessionToEdit.formateur.id,
        nombreParticipants: this.sessionToEdit.nombreParticipants,
        remote: this.sessionToEdit.remote ? 'true' : 'false',
        prix: this.sessionToEdit.prix
      });
    } 
  }

  setDurationAndPrice() {
    const id = parseInt(this.form.value.formation_id);
    this.store.select('trainings').subscribe(trainings => {
      const training = trainings.find(t => t.id === id);
      this.form.patchValue({ duree: training!.duree })
      this.form.patchValue({ prix: training!.prix })
    })
    this.formatEndDate();
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

  getDuration = (start: Date, end: Date) => {
    const startDate: Date = new Date(start);
    const endDate: Date = new Date(end);
    const isWeekend = (date: Date) => [0, 6].includes(date.getDay());
    let duration = 0;  
    while (startDate < endDate) {
      startDate.setDate(startDate.getDate() + 1);
      if (!isWeekend(startDate)) {
        duration++;
      }
    }  
    return duration;
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
    this.store.select('trainings').forEach(trainings => training = trainings.find(t => t.id == this.form.value.formation_id)!);
    let center!: Center;
    this.store.select('centers').forEach(centers => center = centers.find(c => c.id == this.form.value.centre_id)!);
    let former!: Former;
    this.store.select('formers').forEach(formers => former = formers.find(f => f.id == this.form.value.referent_id)!);

    const newSession: TrainingSession = this.form.value;
    newSession.formation = training;
    newSession.centre = center;
    newSession.formateur = former;

    if (newSession.id) this.sessionService.update(newSession).subscribe({
      next: (data) => {
        this.store.dispatch({ type: '[sessions] Editer sessions', data });
        this.toastr.success('Session modifiée avec succès!');
        this.form.reset();
        this.sessionToEdit = undefined;
        this.sessionAdded.emit();
      },
      error: () => {
        this.toastr.success("Erreur lors de la modification d'une session!");    
      }
    });

    else this.sessionService.add(newSession).subscribe({
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
