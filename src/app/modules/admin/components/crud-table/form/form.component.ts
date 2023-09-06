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
      //Ajouter les données avec le service
      //Ajouter d'id renvoyée depuis le back
      data.id = Math.round(Math.random() * 100) + 100;
      this.store.dispatch({ type: `[${this.tab}] Ajouter ${this.tab}`, data });
    } else {
      //Modifier les données avec le service
      this.store.dispatch({ type: `[${this.tab}] Editer ${this.tab}`, data });
    }
    this.toastr.success('Entrée ajoutée ou modifiée avec succès!');
    this.closeModaleEvent.emit();
  }
}
