import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Session } from '../models/Session';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  isLoggedIn: boolean = false;

  constructor(private router: Router, private store: Store<{ session: Session }>) {
    this.store.select('session').subscribe(session => this.isLoggedIn = session.token !== '');
  }

  canActivate() {
    if (!this.isLoggedIn) this.router.navigate(['/']);
    return this.isLoggedIn;
  }
}
