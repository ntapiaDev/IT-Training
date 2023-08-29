import { Component } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Session } from 'src/app/core/models/Session';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('opened', [
      state('false', style({ height: 0 })),
      state('true', style({ height: '225px' })),
      transition('false => true', animate('300ms ease-in-out')),
      transition('true => false', animate('300ms ease-in-out'))
    ])
  ]
})
export class HeaderComponent {
  session$: Observable<Session> = this.store.select('session');
  isBurgerOpen: boolean = false;

  constructor(private store: Store<{ session: Session }>) {}

  toggleBurger() {
    this.isBurgerOpen = !this.isBurgerOpen;
  }
}
