import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Theme } from 'src/app/core/models/Theme';
import { TrainingService } from 'src/app/core/services/training.service';

@Component({
  selector: 'app-add-training',
  templateUrl: './add-training.component.html',
  styleUrls: ['./add-training.component.scss']
})
export class AddTrainingComponent {
  @Output() trainingAdded = new EventEmitter<void>();

  form: FormGroup;
  themes$ = this.store.select('themes');

  isAreaOpen = false;
  isThemeOpen = false;

  constructor(private formBuilder: FormBuilder, private store: Store<{ themes: Theme[] }>, private toastr: ToastrService, private trainingService: TrainingService) {
    this.form = this.formBuilder.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      prix: [0, Validators.required],
      duree: [0, Validators.required],
      prerequis: ['', Validators.required],
      theme_id: [0, Validators.required]
    });
  }

  closeArea(themeIsOpen: boolean) {
    this.isAreaOpen = false;
    this.isThemeOpen = !themeIsOpen;
  }

  closeTheme(isAreaOpen: boolean) {
    this.isThemeOpen = false;
    this.isAreaOpen = !isAreaOpen;
  }

  submit() {
    if (this.form.invalid) {
      this.toastr.error('Merci de remplir tous les champs!');
      return;
    }
    this.trainingService.add(this.form.value).subscribe({
      next: (data) => {
        this.store.dispatch({ type: '[formations] Ajouter formations', data });
        this.toastr.success('Formation ajouté avec succès!');
        this.form.reset();
        this.trainingAdded.emit();
      },
      error: () => {
        this.toastr.success("Erreur lors de l'ajout d'une formation!");    
      }
    });
  }
}
