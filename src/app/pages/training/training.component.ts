import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Training } from 'src/app/stores/trainings/Training';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent {
  name: string = '';
  training?: Training;

  constructor(
    private route: ActivatedRoute,
    private store: Store<{ trainings: Training[] }>
  ) {
    this.name = this.route.snapshot.params['name'];
  }

  ngOnInit() {
    // this.store.select('trainings').subscribe(trainings =>
    //   trainings.length === 0 ? this.store.dispatch({ type: '[Trainings] Load Trainings' }) : null
    // );
    this.store.select('trainings').subscribe(trainings => {
      this.training = trainings.find(training => training.name === this.name)
    })
  }
}
