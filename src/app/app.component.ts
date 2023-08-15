import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'IT-Training';

  constructor(private location: Location) {}

  isHomePage(): boolean {
    return this.location.path() === '';
  }

  getCurrentPageLinks(): string {
    const params = this.location.path().split('/');
    let links = "<a href='/' class='custom-link'>Accueil</a>";
    let url = '';
    for (let i = 1; i < params.length; i++) {
      links += ` > <a href='${url + '/' + params[i]}' class='custom-link'>${params[i]}</a>`;
      url += `/${params[i]}`;
    }
    return links;
  }
}
