import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-session',
  templateUrl: './add-session.component.html',
  styleUrls: ['./add-session.component.scss'],
})
export class AddSessionComponent {
  form: FormGroup;
  startDate?: Date;
  duration?: number;
  endDate?: any;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      formation_id: [0, Validators.required],
      type: ['', Validators.required],
      date_début: [new Date(), Validators.required],
      durée: [0, Validators.required],
      date_fin: [new Date(), Validators.required],
      structure: [0, Validators.required],
      referent: [0, Validators.required],
      nb_participants: [0, Validators.required],
      remote: [false, Validators.required],
      prix: [0, Validators.required]
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

  submit = () => {
    console.log(this.form.value);
  }
}
