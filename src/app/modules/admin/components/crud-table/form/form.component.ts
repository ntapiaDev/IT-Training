import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { CustomService, CustomType, getData } from '../Custom';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  @Input() data!: CustomType;
  @Input() keys!: string[];
  @Input() service!: CustomService;
  @Input() tab!: string;
  @Output() closeModaleEvent: EventEmitter<void> = new EventEmitter<void>();

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private store: Store, private toastr: ToastrService) {
    this.form = this.formBuilder.group({});
  }

  ngOnInit() {
    for (let key of this.keys) {
      this.form.addControl(key, new FormControl(this.data ? this.data[key] : '', [key !== 'id' ? Validators.required : Validators.nullValidator]));
    }
  }

  submit() {
    if (this.form.invalid) {
      this.toastr.error('Vous devez remplir tous les champs!');
      return;
    }
    const data = getData(this.form, this.tab);

    if (!data.id) {
      this.service.add(data).subscribe({
        next: (response: any) => {
          data.id = response.id;
          this.store.dispatch({ type: `[${this.tab}] Ajouter ${this.tab}`, data });
          this.toastr.success('Entrée ajoutée avec succès!');
          this.closeModaleEvent.emit();
        },
        error: () => this.toastr.error('Une erreur s\'est produite lors de la requête HTTP.')
      });
    } else {
      this.service.update(data).subscribe({
        next: () => {
          this.store.dispatch({ type: `[${this.tab}] Editer ${this.tab}`, data })
          this.toastr.success('Entrée modifiée avec succès!');
          this.closeModaleEvent.emit();
        },
        error: () => this.toastr.error('Une erreur s\'est produite lors de la requête HTTP.')
      });
    }
  }
}
