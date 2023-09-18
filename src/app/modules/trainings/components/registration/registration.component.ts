import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Session } from 'src/app/core/models/Session';
import { TrainingSession } from 'src/app/core/models/TrainingSession';
import { AuthService } from 'src/app/core/services/auth.service';
import { TrainingSessionService } from 'src/app/core/services/trainingSession.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  session$ = this.store.select('session');
  trainingSession$ = this.store.select('trainingSessions');
  selectedSession?: TrainingSession;
  foundSession?: TrainingSession;

  constructor(private authService: AuthService, private location: Location, private store: Store<{ session: Session, trainingSessions: TrainingSession[] }>, private trainingSessionService: TrainingSessionService) {
    this.loadSessions();
  }

  ngOnInit() {
    this.trainingSession$.subscribe(sessions => {
      this.session$.subscribe(userSession => {
        this.foundSession = sessions.find(session => session.candidats.find(candidat => candidat.username === userSession.email));
      });
    });
  }

  loadSessions() {
    this.trainingSession$.subscribe(sessions => {
      this.selectedSession = sessions.find(session => this.trainingSessionService.storage.get().includes(session.id));
    })
  }

  addSession(id: number) {
    this.trainingSessionService.storage.add(id);
    this.loadSessions();
  }

  deleteSession(id: number) {
    this.trainingSessionService.storage.delete(id);
    this.loadSessions();
  }

  formatDate(s: Date, e: Date) {
    const start = (new Date(s)).toLocaleString('fr-FR', { day: 'numeric', month: 'short' });
    const end = new Date(e).toLocaleString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
    return start + ' au ' + end;
  }

  formatName(name: string) {
    return name.replace(/ /g, '-');
  }

  redirect() {
    this.authService.setRedirect(this.location.path());
  }
}
