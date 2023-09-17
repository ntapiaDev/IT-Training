import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Training } from 'src/app/core/models/Training';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  input: string = '';
  trainings: Observable<Training[]> = this.store.select('trainings')

  constructor(private store: Store<{ trainings: Training[] }>) { }

  formatName(name: string) {
    return name.replace(/ /g, '-');
  }
}
