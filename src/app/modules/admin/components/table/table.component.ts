import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
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
  currentData!: Area[] | Training[];
  currentKeys!: string[];

  filter: string = '';
  reversed: boolean = false;
  selected: string = '';

  constructor(
    private route: ActivatedRoute,
    private areaService: AreaService,
    private trainingService: TrainingService,
    private store: Store<{ areas: Area[], trainings: Training[] }>
  ) {
    this.currentTab = route.snapshot.url[0].path;

    if (this.currentTab === 'domaines') {
      this.currentService = areaService;
      this.store.select('areas').subscribe(data => this.currentData = data);
    } else if (this.currentTab === 'formations') {
      this.currentService = trainingService;
      this.store.select('trainings').subscribe(data => this.currentData = data);;
    }
    this.currentKeys = Object.keys(this.currentData[0]);
  }

  filterData(data: Area[] | Training[]) {
    return data.filter(data => data.name.toLowerCase().includes(this.filter.toLowerCase()));
  }

  order(key: string) {
    const doReverse = this.selected === key;
    if (!doReverse) {
      this.selected = key;
      this.reversed = false;
    }
    const newData = [...this.currentData].sort((a, b) => a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0);
    if (doReverse && !this.reversed) {
      newData.reverse();
      this.reversed = true;
    } else {
      this.reversed = false;
    }
    this.currentData = newData;
  }

  delete(id: number) {
    //Supprimer les données dans le service
    this.store.dispatch({ type: `[${this.currentTab}] Supprimer ${this.currentTab}`, id });
  }
}
