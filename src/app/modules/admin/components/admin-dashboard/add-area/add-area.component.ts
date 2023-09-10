import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-area',
  templateUrl: './add-area.component.html',
  styleUrls: ['./add-area.component.scss']
})
export class AddAreaComponent {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      nom: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  submit() {
    console.log(this.form.value);
  }
}
