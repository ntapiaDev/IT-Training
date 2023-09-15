import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { adminInit } from 'src/app/core/stores/app.actions';

@Component({
  selector: 'app-back-office',
  templateUrl: './back-office.component.html',
  styleUrls: ['./back-office.component.scss']
})
export class BackOfficeComponent {
  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(adminInit());
  }
}
