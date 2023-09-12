import { Component, Input } from '@angular/core';
import { Area } from 'src/app/core/models/Area';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent {
  @Input() area!: Area;

  formatImageName(name: string) {
    return name.toLowerCase().replace(' ', '_');
  }
}
