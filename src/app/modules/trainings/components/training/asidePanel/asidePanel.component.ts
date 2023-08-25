import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-asidePanel',
  templateUrl: './asidePanel.component.html',
  styleUrls: ['./asidePanel.component.scss']
})
export class AsidePanelComponent {
  @Input() reference!: string;
  @Input() days!: number;
  @Input() price!: number;
  @Input() remote!: boolean;
}
