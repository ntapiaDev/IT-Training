import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Area } from 'src/app/core/models/Area';
import { Theme } from 'src/app/core/models/Theme';
import { Training } from 'src/app/core/models/Training';
import { TrainingSession } from 'src/app/core/models/TrainingSession';
import { AreaService } from 'src/app/core/services/area.service';
import { ThemeService } from 'src/app/core/services/theme.service';
import { TrainingService } from 'src/app/core/services/training.service';
import { TrainingSessionService } from 'src/app/core/services/trainingSession.service';

@Component({
  selector: 'app-crud-table',
  templateUrl: './crud-table.component.html',
  styleUrls: ['./crud-table.component.scss']
})
export class CrudTableComponent {
  currentTab: string;
  currentService!: AreaService | ThemeService | TrainingService | TrainingSessionService;
  currentData!: (Area | Theme | Training | TrainingSession)[];
  currentKeys: string[];

  data!: Area | Theme |Training | TrainingSession;
  filter: string = '';
  modaleAction: string = '';
  modaleId: number = 0;
  modaleIsOpen: boolean = false
  reversed: boolean = false;
  selected: string = '';

  constructor(
    private route: ActivatedRoute,
    private areaService: AreaService,
    private themeService: ThemeService,
    private trainingService: TrainingService,
    private trainingSessionService: TrainingSessionService,
    private store: Store<{ areas: Area[], themes: Theme[], trainings: Training[], trainingSessions: TrainingSession[] }>,
    private toastr: ToastrService
  ) {
    this.currentTab = route.snapshot.url[0].path;

    if (this.currentTab === 'domaines') {
      this.currentService = areaService;
      this.store.select('areas').subscribe(data => this.currentData = data);
    } else if (this.currentTab === 'themes') {
      this.currentService = themeService;
      this.store.select('themes').subscribe(data => this.currentData = data);
    } else if (this.currentTab === 'formations') {
      this.currentService = trainingService;
      this.store.select('trainings').subscribe(data => this.currentData = data);
    } else if (this.currentTab === 'sessions') {
      this.currentService = trainingSessionService;
      this.store.select('trainingSessions').subscribe(data => this.currentData = data);
    }
    this.currentKeys = Object.keys(this.currentData[0]);
  }

  toggleModale(action: string = '', id: number = 0) {
    this.data = this.currentData.find(data => data.id === id)!;
    this.modaleAction = action;
    this.modaleId = id;
    this.modaleIsOpen = !this.modaleIsOpen;
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  filterData(data: (Area | Theme | Training | TrainingSession)[]) {
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

  delete() {
    const id = this.modaleId;
    //Supprimer les données dans le service
    this.store.dispatch({ type: `[${this.currentTab}] Supprimer ${this.currentTab}`, id });
    this.toastr.success('Entrée supprimée avec succès!');
    this.toggleModale();
  }
}
