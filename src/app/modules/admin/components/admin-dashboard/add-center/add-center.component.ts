import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FullAddress } from 'src/app/core/models/Address';

@Component({
  selector: 'app-add-center',
  templateUrl: './add-center.component.html',
  styleUrls: ['./add-center.component.scss']
})
export class AddCenterComponent {
  @Output() centerAdded = new EventEmitter<void>();

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService) {
    this.form = this.formBuilder.group({
      nom: ['', Validators.required],
      adresse: this.formBuilder.group({
        numero: ['', Validators.required],
        adresse: ['', Validators.required],
        ville: this.formBuilder.group({
          nom: ['', Validators.required],
          code_postal: ['', Validators.required],
          long: [0, Validators.required],
          lat: [0, Validators.required]
        })
      })
    });
  }

  loadAddress(loadedAddress: FullAddress) {
    this.form.patchValue({
      adresse: {
        numero: loadedAddress.numero,
        adresse: loadedAddress.adresse,
        ville: {
          nom: loadedAddress.ville.nom,
          code_postal: loadedAddress.ville.code_postal,
          long: loadedAddress.ville.long,
          lat: loadedAddress.ville.lat
        }
      }
    });
  }

  submit() {
    console.log(this.form.value);
    this.toastr.success('Centre ajouté avec succès!')
    this.centerAdded.emit();
  }
}
