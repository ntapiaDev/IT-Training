import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Area } from 'src/app/core/models/Area';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'app-add-theme',
  templateUrl: './add-theme.component.html',
  styleUrls: ['./add-theme.component.scss']
})
export class AddThemeComponent {
  @Input() isOpen = false;
  @Output() closeEvent = new EventEmitter<boolean>();
  @ViewChild('container') container?: ElementRef;

  form: FormGroup;
  areas$ = this.store.select('areas');

  height = 0;
  maxHeight = 0;

  constructor(private formBuilder: FormBuilder, private store: Store<{ areas: Area[] }>, private themeService: ThemeService, private toastr: ToastrService) {
    this.form = this.formBuilder.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      domaine_id: [0, Validators.required]
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
    this.themeService.add(this.form.value).subscribe({
      next: (data) => {
        this.store.dispatch({ type: '[themes] Ajouter themes', data });
        this.toastr.success('Thème ajouté avec succès!');
        this.form.reset();
      },
      error: () => {
        this.toastr.success("Erreur lors de l'ajout d'un thème!");    
      }
    });
  }
}
