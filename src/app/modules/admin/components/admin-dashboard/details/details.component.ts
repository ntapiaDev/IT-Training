import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { TrainingSession } from 'src/app/core/models/TrainingSession';
import { User } from 'src/app/core/models/User';
import { UserService } from 'src/app/core/services/user.service';
import { invalideCandidate, valideCandidate } from 'src/app/core/stores/trainingSession/trainingSessions.actions';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  @Input() isOpen!: boolean;
  @Input() session?: TrainingSession;
  @Input() valid!: number
  @Input() invalid!: number
  @Output() closeDetails = new EventEmitter<void>();
  @ViewChild('container') container?: ElementRef;

  height = 0;
  maxHeight = 0;

  constructor(private store: Store, private toastr: ToastrService, private userService: UserService) {}

  ngAfterContentChecked() {
    this.maxHeight = this.container?.nativeElement.offsetHeight;
  }

  handleClose() {
    this.closeDetails.emit();
  }

  formatDate(d: Date) {
    const date = new Date(d);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }

  filterCandidates(candidats?: User[]) {
    const valid: User[] = [];
    const invalid: User[] = [];
    for (let candidat of candidats || []) {
      if (candidat.validate) valid.push(candidat);
      else invalid.push(candidat);
    }
    return { valid, invalid };
  }

  valideCandidate(username: string) {
    this.userService.validate(username).subscribe({
      next: (data) => {
        this.store.dispatch(valideCandidate({ id: this.session!.id, username }));
        this.toastr.success('Candidat validé avec succès!');
      },
      error: (error) => {
        this.toastr.error("Ce candidaté n'a pas pu être validé!");
      }
    });
  }

  invalideCandidate(username: string) {
    this.userService.invalidate(username).subscribe({
      next: (data) => {
        this.store.dispatch(invalideCandidate({ id: this.session!.id, username }));
        this.toastr.success('Candidat invalidé avec succès!');
      },
      error: () => {
        this.toastr.error("Ce candidaté n'a pas pu être invalidé!");
      }
    });
  }
}
