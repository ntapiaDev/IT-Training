import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Area } from 'src/app/core/models/Area';
import { Training } from 'src/app/core/models/Training';
import { AreasService } from 'src/app/core/services/areas.service';
import { TrainingsService } from 'src/app/core/services/trainings.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  currentTab: string;
  currentService!: AreasService | TrainingsService;
  currentData$!: Observable<Area[] | Training[]>;
  currentKeys!: string[];

  constructor(
    private route: ActivatedRoute,
    private areasService: AreasService,
    private trainingsService: TrainingsService,
    private store: Store<{ areas: Area[], trainings: Training[] }>
  ) {
    this.currentTab = route.snapshot.url[0].path;

    if (this.currentTab === 'domaines') {
      this.currentService = areasService;
      this.currentData$ = this.store.select('areas');
    } else if (this.currentTab === 'formations') {
      this.currentService = trainingsService;
      this.currentData$ = this.store.select('trainings');
    }
    this.currentData$.subscribe(data => this.currentKeys = Object.keys(data[0]));
  }
}
