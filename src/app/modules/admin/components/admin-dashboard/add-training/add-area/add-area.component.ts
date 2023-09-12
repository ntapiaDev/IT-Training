import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { AreaService } from 'src/app/core/services/area.service';

@Component({
  selector: 'app-add-area',
  templateUrl: './add-area.component.html',
  styleUrls: ['./add-area.component.scss']
})
export class AddAreaComponent {
  @Input() isOpen = false;
  @Output() closeEvent = new EventEmitter<boolean>();
  @ViewChild('container') container?: ElementRef;

  form: FormGroup;

  height = 0;
  maxHeight = 0;

  constructor(private areaService: AreaService, private formBuilder: FormBuilder, private store: Store, private toastr: ToastrService) {
    this.form = this.formBuilder.group({
      nom: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngAfterViewInit() {
    this.maxHeight = this.container?.nativeElement.offsetHeight;
  }

  toggle() {
    this.closeEvent.emit(this.isOpen);
  }

  submit() {
    if (this.form.invalid) {
      this.toastr.error('Merci de remplir tous les champs!');
      return;
    }
    this.areaService.add(this.form.value).subscribe({
      next: (data) => {
        this.store.dispatch({ type: '[domaines] Ajouter domaines', data });
        this.toastr.success('Domaine ajouté avec succès!');
        this.form.reset();
      },
      error: () => {
        this.toastr.success("Erreur lors de l'ajout d'un domaine!");    
      }
    });
  }
}
