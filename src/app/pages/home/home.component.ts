import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  form = new FormGroup({
    search: new FormControl('')
  });

  async submit() {
    console.log(this.form.value.search);
  }
}
