import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { TrainingSession } from 'src/app/core/models/TrainingSession';
import { TrainingSessionService } from 'src/app/core/services/trainingSession.service';

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
  sessionToEdit?: TrainingSession;
  selected = '';
  reversed = false;
  currentTab = 'Inter';
  detailsId = 0;
  formIsOpen = false;
  detailedSession = 0;

  constructor(private store: Store<{ trainingSessions: TrainingSession[]} >, private sessionService: TrainingSessionService, private toastr: ToastrService) { }

  ngOnInit() {
    this.selectData(this.currentTab);
  }

  formatDate(d: Date) {
    const date = new Date(d);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }

  toogleForm() {
    this.formIsOpen = !this.formIsOpen;
    this.detailedSession = 0;
  }

  toggleDetails(id: number) {
    this.detailedSession = this.detailedSession === id ? 0 : id;
  }

  toggleModale(e: Event, action: string = '', id: number = 0) {
    e.stopPropagation();
    this.modaleAction = action;
    this.modaleId = id;
    this.modaleIsOpen = !this.modaleIsOpen;
  }

  getSession() {
    return this.data.find(session => session.id === this.modaleId);
  }

  filterData(sessions: TrainingSession[]) {
    return sessions.filter(session => session['formation'].nom.toLowerCase().includes(this.filter.toLowerCase()));
  }

  selectData(tab: string) {
    this.currentTab = tab;
    this.sessions$.subscribe(sessions => this.data = sessions.filter(s => s.type === tab));
  }

  order(key: string) {
    const doReverse = this.selected === key;
    if (!doReverse) {
      this.selected = key;
      this.reversed = false;
    }
    const newData = [...this.data].sort((a, b) => {
      return a[key] < b[key] ? -1 : a[key] > b[key] ? 1 :
      a[key].nom < b[key].nom ? -1 : a[key].nom > b[key].nom ? 1 : 0
    });
    if (doReverse && !this.reversed) {
      newData.reverse();
      this.reversed = true;
    } else {
      this.reversed = false;
    }
    this.data = newData;
  }

  editSession(session: TrainingSession) {
    this.sessionToEdit = session;
    this.formIsOpen = true;
  }

  delete(e: Event) {
    const id = this.modaleId;
    this.sessionService.delete(id).subscribe({
      next: () => {
        this.store.dispatch({ type: '[sessions] Supprimer sessions', id });
        this.toastr.success('Session supprimée avec succès!');
        this.toggleModale(e);
      },
      error: () => this.toastr.error("Erreur lors de la suppression d'une session!")
    });
  }
}
