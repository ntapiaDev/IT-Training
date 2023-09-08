import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-session',
  templateUrl: './add-session.component.html',
  styleUrls: ['./add-session.component.scss'],
})
export class AddSessionComponent {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      nom: [''],
      type: [''],
      date: [new Date()],
      duration: [0],
      structure: [0],
      referent: [0],
      nb_participants: [0],
      price: [0],
      remote: [false]
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
}
