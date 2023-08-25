import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {

  form = new FormGroup({
    search: new FormControl('')
  });

  async submit() {
    console.log(this.form.value.search);
  }
}
