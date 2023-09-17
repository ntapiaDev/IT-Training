import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getSession } from './core/stores/session/session.actions';
import { appInit } from './core/stores/app.actions';
import { Session } from './core/models/Session';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  session$ = this.store.select('session');
  title = 'IT-Training';

  constructor(private location: Location, private router: Router, private store: Store<{ session: Session }>) { }

  ngOnInit(): void {
    this.store.dispatch(appInit());
    this.store.dispatch(getSession());
  }

  isAuthPage(): boolean {
    return ['/inscription', '/connexion'].includes(this.location.path());
  }

  isAdminPage(): boolean {
    return this.location.path().startsWith('/admin');
  }

  isHomePage(): boolean {
    return this.location.path() === '';
  }

  getCurrentPageLinks(): string {
    const params = this.location.path().split('/');
    let links = "<a href='/' class='custom-link'>Accueil</a>";
    let url = '';
    for (let i = 1; i < params.length - 1; i++) {
      links += ` > <a href='${url + '/' + params[i]}' class='custom-link'>${decodeURIComponent(params[i].replace(/-/g, ' '))}</a>`;
      url += `/${params[i]}`;
    }
    links += ` > ${decodeURIComponent(params[params.length -1].split('?')[0].replace(/-/g, ' '))}`;
    return links;
  }

  processLinks(e: MouseEvent) {
    const element: HTMLElement = e.target as HTMLElement;
    if (element.nodeName === 'A') {
      e.preventDefault();
      const link = element.getAttribute('href');
      this.router.navigate([link]);
    }
  }
}
