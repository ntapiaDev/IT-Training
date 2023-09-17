import { Component } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Session } from 'src/app/core/models/Session';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('opened', [
      state('false', style({ height: 0 })),
      state('true', style({ height: '260px' })),
      transition('false => true', animate('300ms ease-in-out')),
      transition('true => false', animate('300ms ease-in-out'))
    ])
  ]
})
export class HeaderComponent {
  session$: Observable<Session> = this.store.select('session');
  isBurgerOpen: boolean = false;

  constructor(private authService: AuthService, private store: Store<{ session: Session }>, private toastr: ToastrService ) {}

  toggleBurger() {
    this.isBurgerOpen = !this.isBurgerOpen;
  }

  logout() {
    this.authService.logout();
    this.toastr.success('Vous êtes bien déconnecté!');
    this.authService.getSession().subscribe(session => {
      this.store.dispatch({ type: '[Session] Get Session Success', session });
    })
  }
}
