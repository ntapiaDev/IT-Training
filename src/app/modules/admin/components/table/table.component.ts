import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Area } from 'src/app/core/models/Area';
import { Training } from 'src/app/core/models/Training';
import { AreaService } from 'src/app/core/services/area.service';
import { TrainingService } from 'src/app/core/services/training.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  currentTab: string;
  currentService!: AreaService | TrainingService;
  currentData$!: Observable<Area[] | Training[]>;
  currentKeys!: string[];

  constructor(
    private route: ActivatedRoute,
    private areaService: AreaService,
    private trainingService: TrainingService,
    private store: Store<{ areas: Area[], trainings: Training[] }>
  ) {
    this.currentTab = route.snapshot.url[0].path;

    if (this.currentTab === 'domaines') {
      this.currentService = areaService;
      this.currentData$ = this.store.select('areas');
    } else if (this.currentTab === 'formations') {
      this.currentService = trainingService;
      this.currentData$ = this.store.select('trainings');
    }
    this.currentData$.subscribe(data => this.currentKeys = Object.keys(data[0]));
  }
}
