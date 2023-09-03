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
      this.form.addControl(key, new FormControl('', [key !== 'id' ? Validators.required : Validators.nullValidator]));
    }
  }

  submit() {
    if (this.form.invalid) {
      this.toastr.error('Vous devez remplir tous les champs!');
      return;
    }
    //Choisir l'action en fonction de l'id (add ou update)
    //Ajouter les données dans le service
    switch (this.tab) {
      case 'domaines':
        const area: Area = {
          id: this.form.value.id,
          name: this.form.value.name,
          icon: this.form.value.icon
        }
        //Ajouter d'id renvoyée depuis le back
        this.store.dispatch({ type: '[domaines] Ajouter domaine', area });
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
          remote: this.form.value.remote === 'true',
        }
        //Ajouter d'id renvoyée depuis le back
        this.store.dispatch({ type: '[formations] Ajouter formation', training });
    }
    this.toastr.success('Entrée ajoutée avec succès!');
    this.closeModaleEvent.emit();
  }
}
