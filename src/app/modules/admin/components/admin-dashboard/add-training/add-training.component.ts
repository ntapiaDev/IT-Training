import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-training',
  templateUrl: './add-training.component.html',
  styleUrls: ['./add-training.component.scss']
})
export class AddTrainingComponent {
  @Output() trainingAdded = new EventEmitter<void>();

  form: FormGroup;

  isAreaOpen = false;
  isThemeOpen = false;

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService) {
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
    console.log(this.form.value);
    this.toastr.success('Formation ajoutée avec succès!')
    this.trainingAdded.emit();
  }
}
