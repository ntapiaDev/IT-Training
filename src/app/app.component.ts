import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'IT-Training';

  constructor(private router: Router) {}

  isHomePage(): boolean {
    return this.router.url === '/';
  }
}
