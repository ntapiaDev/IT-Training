import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TrainingSession } from 'src/app/core/models/TrainingSession';

@Component({
  selector: 'app-selected-training',
  templateUrl: './selected-training.component.html',
  styleUrls: ['./selected-training.component.scss']
})
export class SelectedTrainingComponent {
  @Input() session!: TrainingSession;
  @Output() deleteEvent: EventEmitter<number> = new EventEmitter<number>();

  deleteSession(id: number) {
    this.deleteEvent.emit(id);
  }
}
