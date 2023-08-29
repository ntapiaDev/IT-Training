import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Session } from '../models/Session';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RegisterGuard {
  isLoggedOut: boolean = false;

  constructor(private router: Router, private store: Store<{ session: Session }>) {
    this.store.select('session').subscribe(session => this.isLoggedOut = session.token === '');
  }

  canActivate() {
    if (!this.isLoggedOut) this.router.navigate(['/tableau-de-bord']);
    return this.isLoggedOut;
  }
}
