import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TrainingSession } from 'src/app/core/models/TrainingSession';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  @Input() isOpen!: boolean;
  @Input() session?: TrainingSession;
  @Output() closeDetails = new EventEmitter<void>();
  @ViewChild('container') container?: ElementRef;

  height = 0;
  maxHeight = 0;

  ngAfterViewInit() {
    this.maxHeight = this.container?.nativeElement.offsetHeight;
  }

  handleClose() {
    this.closeDetails.emit();
  }
}
