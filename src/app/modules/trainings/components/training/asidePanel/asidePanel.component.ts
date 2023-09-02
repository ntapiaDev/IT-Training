import { Component, Input } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { TrainingService } from 'src/app/core/services/training.service';

@Component({
  selector: 'app-asidePanel',
  templateUrl: './asidePanel.component.html',
  styleUrls: ['./asidePanel.component.scss'],
  animations: [
    trigger('fadeIn', [
      state('false', style({ opacity: 0, display: 'none' })),
      state('true', style({ opacity: 1, display: 'block' })),
      transition('false => true', [
        style({ display: 'block' }),
        animate('300ms ease-in-out')
      ]),
      transition('true => false', animate('0ms'))
    ])
  ]
})
export class AsidePanelComponent {
  @Input() id!: number;
  @Input() reference!: string;
  @Input() days!: number;
  @Input() price!: number;
  @Input() remote!: boolean;

  currentTab = 1;

  constructor(private trainingService: TrainingService) { }

  changeTab(index: number) {
    this.currentTab = index;
  }

  register(id: number) {
    this.trainingService.storage.add(id);
  }
}
