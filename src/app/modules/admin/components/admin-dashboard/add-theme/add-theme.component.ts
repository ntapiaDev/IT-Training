import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-theme',
  templateUrl: './add-theme.component.html',
  styleUrls: ['./add-theme.component.scss']
})
export class AddThemeComponent {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      domaine_id: [0, Validators.required]
    });
  }

  submit() {
    console.log(this.form.value);
  }
}
