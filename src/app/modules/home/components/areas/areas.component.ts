import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Area } from 'src/app/core/models/Area';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.scss']
})
export class AreasComponent {
  areas$: Observable<Area[]> = this.store.select('areas');

  constructor(private store: Store<{ areas: Area[] }>) { }
}
