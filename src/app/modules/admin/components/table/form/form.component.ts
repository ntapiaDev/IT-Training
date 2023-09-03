import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Area } from 'src/app/core/models/Area';
import { Training } from 'src/app/core/models/Training';
import { AreaService } from 'src/app/core/services/area.service';
import { TrainingService } from 'src/app/core/services/training.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  @Input() data!: Area | Training;
  @Input() keys!: string[];
  @Input() service!: AreaService | TrainingService;
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

    switch (this.tab) {
      case 'domaines':
        const area: Area = {
          id: this.form.value.id,
          name: this.form.value.name,
          icon: this.form.value.icon
        }
        if (!area.id) {
          //Ajouter les données avec le service
          //Ajouter d'id renvoyée depuis le back
          area.id = Math.round(Math.random() * 100) + 100;
          this.store.dispatch({ type: '[domaines] Ajouter domaine', area });
        } else {
          //Modifier les données avec le service
          this.store.dispatch({ type: '[domaines] Editer domaine', area });
        }
        break;

      case 'formations':
        const training: Training = {
          id: this.form.value.id,
          name: this.form.value.name,
          reference: this.form.value.reference,
          description: this.form.value.description,
          icon: this.form.value.icon,
          theme_id: parseInt(this.form.value.theme_id),
          days: parseInt(this.form.value.days),
          price: parseInt(this.form.value.price),
          remote: ['true', true].includes(this.form.value.remote)
        }
        if (!training.id) {
          //Ajouter les données avec le service
          //Ajouter d'id renvoyée depuis le back
          training.id = Math.round(Math.random() * 100) + 100;
          this.store.dispatch({ type: '[formations] Ajouter formation', training });
        } else {
          //Modifier les données avec le service
          this.store.dispatch({ type: '[formations] Editer formation', training });
        }
        break;
    }
    this.toastr.success('Entrée ajoutée ou modifiée avec succès!');
    this.closeModaleEvent.emit();
  }
}
