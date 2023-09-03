import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Training } from 'src/app/core/models/Training';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  @Input() selectedTrainings: Training[] = [];
  @Input() trainings!: Observable<Training[]>;
  @Output() addEvent: EventEmitter<number> = new EventEmitter<number>();

  selectedTraining: string = '';

  filterTrainings(training: Training): boolean {
    const match = training.name.toLowerCase().includes(this.selectedTraining.toLowerCase());
    const alreadySelected = this.selectedTrainings.some(t => t.id === training.id);
    return match && !alreadySelected;
  }

  addTraining(id: number) {
    this.addEvent.emit(id);
    this.selectedTraining = '';
  }
}
