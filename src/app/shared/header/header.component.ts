import { Component } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';

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
  isBurgerOpen: boolean = false;

  toggleBurger() {
    this.isBurgerOpen = !this.isBurgerOpen;
  }
}
