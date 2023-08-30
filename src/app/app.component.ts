import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getSession } from './core/stores/session/session.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'IT-Training';

  constructor(private location: Location, private router: Router, private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(getSession());
  }

  isAuthPage(): boolean {
    return ['/inscription', '/connexion'].includes(this.location.path());
  }

  isHomePage(): boolean {
    return this.location.path() === '';
  }

  getCurrentPageLinks(): string {
    const params = this.location.path().split('/');
    let links = "<a href='/' class='custom-link'>Accueil</a>";
    let url = '';
    for (let i = 1; i < params.length; i++) {
      links += ` > <a href='${url + '/' + params[i]}' class='custom-link'>${params[i].replace(/-/g, ' ')}</a>`;
      url += `/${params[i]}`;
    }
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
