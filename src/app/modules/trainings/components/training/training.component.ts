import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Training } from 'src/app/core/models/Training';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent {
  name: string = '';
  training?: Training;

  constructor(private route: ActivatedRoute, private router: Router, private store: Store<{ trainings: Training[] }>) {
    this.name = this.route.snapshot.params['name'];
  }

  ngOnInit() {
    // this.store.select('trainings').subscribe(trainings =>
    //   trainings.length === 0 ? this.store.dispatch({ type: '[Trainings] Load Trainings' }) : null
    // );
    this.store.select('trainings').subscribe(trainings => {
      this.training = trainings.find(training => training.nom === this.name);
      if (!this.training) {
        this.router.navigate(['../formations']);
      }
    })
  }
}
