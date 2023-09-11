import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-marker',
  templateUrl: './marker.component.html',
  styleUrls: ['./marker.component.scss'],
})
export class MarkerComponent {
  @Input() quantity: number = 0;
  @Input() x: number = 0;
  @Input() y: number = 0;

  ngOnInit() {
    [this.x, this.y] = this.getCoords(this.x, this.y);
  }

  getCoords(x: number, y: number) {
    const calculatePosition = (value: number, min: number, max: number) => {
      const range = max - min;
      const current = value - min;
      return (current / range) * 100;
    };

    const left = -4.2;
    const right = 10.6;
    const bottom = 40.7;
    const top = 51.4;

    return [calculatePosition(x, left, right), calculatePosition(y, bottom, top)];
  }
}
