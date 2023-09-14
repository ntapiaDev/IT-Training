import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { TrainingSession } from 'src/app/core/models/TrainingSession';

interface Marker {
  trainings: string[];
  city: string;
  quantity: number;
  x: number;
  y: number;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent {
  @Input() activeCity: string = '';
  @Input() variant: string = 'default';
  @Output() clicked = new EventEmitter<{ city: string, trainings: string[]}>();
  markers: Marker[] = [];
  sessions$ = this.store.select('trainingSessions');

  constructor(private store: Store<{ trainingSessions: TrainingSession[] }>) {}

  ngOnInit() {
    this.sessions$.forEach(sessions => 
      sessions.forEach((session) => {
        const alreadyExists = this.markers.find(marker => marker.city === session.centre.adresse.ville.nom);
        if (alreadyExists) {
          if (!alreadyExists.trainings.includes(session.formation.nom)) alreadyExists.trainings.push(session.formation.nom);
          alreadyExists.quantity++;
        } 
        else {
          const marker: Marker = {
            trainings: [session.formation.nom],
            city: session.centre.adresse.ville.nom,
            quantity: 1,
            x: session.centre.adresse.ville.lon,
            y: session.centre.adresse.ville.lat,
          };
          this.markers.push(marker);
        }
      })
    );
  }

  sendClick(city: string, trainings: string[]) {
    this.activeCity = city;
    this.clicked.emit({ city, trainings });
  }
}
