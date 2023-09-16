import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Session } from 'src/app/core/models/Session';
import { Training } from 'src/app/core/models/Training';
import { TrainingSession } from 'src/app/core/models/TrainingSession';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  @Output() addEvent: EventEmitter<number> = new EventEmitter<number>();

  trainings$ = this.store.select('trainings');
  sessions$ = this.store.select('trainingSessions');
  cities: string[] = [];
  sessions: TrainingSession[] = [];

  selectedTraining = '';
  openTraining = false;
  selectedCity = '';
  openCity = false;
  selectedSession = '';
  openSession = false;

  constructor(private store: Store<{ session: Session, trainings: Training[], trainingSessions: TrainingSession[] }>) { }

  ngOnInit() {
    this.store.select('session').subscribe(session => {
      if (session.cart === 0) {
        this.selectedTraining = '';
        this.cities = [];
        this.selectedCity = '';
        this.sessions = [];
        this.selectedSession = '';
      }
    });
  }

  filterTrainings(training: Training) {
    return training.nom.toLowerCase().includes(this.selectedTraining.toLowerCase());
  }

  filterCities(city: string) {
    if (this.selectedCity === '') return true;
    return city.toLowerCase().includes(this.selectedCity.toLowerCase());
  }

  filterSessions(session: TrainingSession) {
    if (this.selectedSession === '') return true;
    return this.formatDate(session.dateDebut, session.dateFin).includes(this.selectedSession.toLowerCase());;
  }

  selectTraining(name: string) {
    this.selectedTraining = name;
    this.cities = [];
    this.selectedCity = '';
    this.sessions = [];
    this.selectedSession = '';
    this.sessions$.subscribe(sessions => sessions.forEach(session => {
      if (session.formation?.nom === name) {
        const city = session.centre.adresse.ville.nom;
        if (!this.cities.includes(city)) this.cities.push(city);
      }
    }));
  }

  selectCity(name: string) {
    this.selectedCity = name;
    this.sessions = [];
    this.selectedSession = '';
    this.sessions$.subscribe(sessions => sessions.forEach(session => {
      if (session.formation?.nom === this.selectedTraining && session.centre.adresse.ville.nom === name) {
        if (!this.sessions.find(s => s.dateDebut === session.dateDebut)) this.sessions.push(session);
      }
    }));
  }

  selectSession(session: TrainingSession) {
    this.selectedSession = this.formatDate(session.dateDebut, session.dateFin);
    this.addEvent.emit(session.id);
  }

  formatDate(s: Date, e: Date) {
    const start = (new Date(s)).toLocaleString('fr-FR', { day: 'numeric', month: 'short' });
    const end = new Date(e).toLocaleString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
    return start + ' au ' + end;
  }

  closeAll() {
    this.openTraining = false;
    this.openCity = false;
    this.openSession = false;
  }

  blockClose(e: Event) {
    e.stopPropagation();
  }
}
