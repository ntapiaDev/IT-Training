import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { TrainingSession } from 'src/app/core/models/TrainingSession';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  filter = '';
  data!: TrainingSession[];
  sessions$ = this.store.select('trainingSessions');
  modaleAction = '';
  modaleId = 0;
  modaleIsOpen = false;
  selected = 1;
  reversed = false;
  currentTab = 1;
  detailsId = 0;

  //FAKE DATA
  session = {
    id: 1,
    nom: 'Super Session',
    formation_id: 1,
    date: 12345
  }
  detailedSession: number = 1;

  constructor(private store: Store<{ trainingSessions: TrainingSession[]} >, private toastr: ToastrService) { }

  toggleModale(action: string = '', id: number = 0) {
    // this.data = this.sessions$.find(data => data.id === id)!;
    this.modaleAction = action;
    this.modaleId = id;
    this.modaleIsOpen = !this.modaleIsOpen;
  }

  filterData(sessions: TrainingSession[]) {
    // return sessions.filter(session => !session.nom || session.nom?.toLowerCase().includes(this.filter.toLowerCase()));
  }

  selectData(tab: number) {
    this.currentTab = tab;
    //Filtrer en fonction du type de session
  }

  order(key: number) {
    const doReverse = this.selected === key;
    if (!doReverse) {
      this.selected = key;
      this.reversed = false;
    }
    // const newData = [...this.currentData].sort((a, b) => a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0);
    if (doReverse && !this.reversed) {
      // newData.reverse();
      this.reversed = true;
    } else {
      this.reversed = false;
    }
    // this.currentData = newData;
  }

  showMore(id: number) {}

  delete() {}
}
