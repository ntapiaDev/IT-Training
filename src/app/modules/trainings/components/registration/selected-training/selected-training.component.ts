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

  formatName(name: string) {
    return name.replace(/ /g, '-');
  }

  deleteSession(id: number) {
    this.deleteEvent.emit(id);
  }

  formatDate(s: Date, e: Date) {
    const start = (new Date(s)).toLocaleString('fr-FR', { day: 'numeric', month: 'short' });
    const end = new Date(e).toLocaleString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
    return start + ' au ' + end;
  }
}
