import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-training',
  templateUrl: './add-training.component.html',
  styleUrls: ['./add-training.component.scss']
})
export class AddTrainingComponent {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      theme_id: [0, Validators.required]
    });
  }

  submit() {
    console.log(this.form.value);
  }
}
