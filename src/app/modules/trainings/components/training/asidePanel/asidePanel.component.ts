import { Component, Input } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-asidePanel',
  templateUrl: './asidePanel.component.html',
  styleUrls: ['./asidePanel.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in-out', style({ opacity: 1 }))
      ]),
    ])
  ]
})
export class AsidePanelComponent {
  @Input() reference!: string;
  @Input() days!: number;
  @Input() price!: number;
  @Input() remote!: boolean;

  currentTab = 1;

  changeTab(index: number) {
    this.currentTab = index;
  }
}
