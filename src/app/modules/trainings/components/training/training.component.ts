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
  city: string = '';
  name: string = '';
  training?: Training;

  constructor(private route: ActivatedRoute, private router: Router, private store: Store<{ trainings: Training[] }>) {
    this.name = this.route.snapshot.params['name'];
    this.city = this.route.snapshot.queryParams['ville'];
  }

  ngOnInit() {
    this.store.select('trainings').subscribe(trainings => {
      this.training = trainings.find(training => training.nom.replace(/ /g, '-') === this.name);
      if (!this.training) {
        this.router.navigate(['../formations']);
      }
    })
  }
}
