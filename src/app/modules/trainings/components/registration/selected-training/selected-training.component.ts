import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Training } from 'src/app/core/models/Training';

@Component({
  selector: 'app-selected-training',
  templateUrl: './selected-training.component.html',
  styleUrls: ['./selected-training.component.scss']
})
export class SelectedTrainingComponent {
  @Input() training!: Training;
  @Output() deleteEvent: EventEmitter<number> = new EventEmitter<number>();

  deleteTraining(id: number) {
    this.deleteEvent.emit(id);
  }
}
