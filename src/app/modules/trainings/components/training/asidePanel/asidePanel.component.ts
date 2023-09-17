import { Component, Input } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { Store } from '@ngrx/store';
import { TrainingSession } from 'src/app/core/models/TrainingSession';
import { TrainingSessionService } from 'src/app/core/services/trainingSession.service';

@Component({
  selector: 'app-asidePanel',
  templateUrl: './asidePanel.component.html',
  styleUrls: ['./asidePanel.component.scss'],
  animations: [
    trigger('fadeIn', [
      state('false', style({ opacity: 0, display: 'none' })),
      state('true', style({ opacity: 1, display: 'block' })),
      transition('false => true', [
        style({ display: 'block' }),
        animate('300ms ease-in-out')
      ]),
      transition('true => false', animate('0ms'))
    ])
  ]
})
export class AsidePanelComponent {
  @Input() name!: string;
  @Input() id!: number;
  @Input() duree!: number;
  @Input() prix!: number;
  @Input() prerequis!: boolean;
  @Input() city: string = '';

  currentTab = 1;
  sessions: TrainingSession[] = [];

  constructor(private store: Store<{ trainingSessions: TrainingSession[] }>, private trainingSessionService: TrainingSessionService) { }

  ngOnInit() {
    this.store.select('trainingSessions').subscribe(
      sessions => this.sessions = sessions
        .filter(session => (session.formation?.nom === this.name) && (session.type === 'Inter'))
        .sort((a, b) => a['dateDebut'] < b['dateDebut'] ? -1 : a['dateDebut'] > b['dateDebut'] ? 1 : 0)
      );
    if (this.city) this.currentTab = 2;
  }

  changeTab(index: number) {
    this.currentTab = index;
  }

  formatDate(s: Date, e: Date) {
    const start = (new Date(s)).toLocaleString('fr-FR', { day: 'numeric', month: 'short' });
    const end = new Date(e).toLocaleString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
    return start + ' au ' + end;
  }

  dispatchClick(data: { city: string }) {
    this.city = data.city;
    this.currentTab = 2;
  }

  filterSessions(sessions: TrainingSession[]) {
    if (!this.city) return sessions;
    return sessions.filter(session => session.centre.adresse.ville.nom === this.city);
  }

  resetCity() {
    this.city = '';
  }

  register(id: number) {
    this.trainingSessionService.storage.add(id);
  }
}
