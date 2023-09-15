import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Session } from '../models/Session';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard {
  isAdmin: boolean = false;

  constructor(private router: Router, private store: Store<{ session: Session }>) {
    this.store.select('session').subscribe(session => this.isAdmin = session.role === 'ROLE_ADMIN');
  }

  canActivate() {
    if (!this.isAdmin) this.router.navigate(['/']);
    return this.isAdmin;
  }
}
