import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Address, City } from 'src/app/core/models/Address';
import { Former } from 'src/app/core/models/User';
import { AddressService } from 'src/app/core/services/address.service';
import { CityService } from 'src/app/core/services/city.service';
import { FormerService } from 'src/app/core/services/former.service';

@Component({
  selector: 'app-add-former',
  templateUrl: './add-former.component.html',
  styleUrls: ['./add-former.component.scss']
})
export class AddFormerComponent {
  @Output() formerAdded = new EventEmitter<void>();

  form: FormGroup;

  constructor(private addressService: AddressService, private cityService: CityService, private formBuilder: FormBuilder, private formerService: FormerService, private toastr: ToastrService) {
    this.form = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      securiteSociale: ['', Validators.required],
      siret: ['', Validators.required],
      email: ['', Validators.required],
      telephone: ['', Validators.required],
      adresse: this.formBuilder.group({
        numero: ['', Validators.required],
        adresse: ['', Validators.required],
        ville: this.formBuilder.group({
          nom: ['', Validators.required],
          code_postal: ['', Validators.required],
          lon: [0, Validators.required],
          lat: [0, Validators.required]
        })
      })
    });
  }

  loadAddress(loadedAddress: Address) {
    this.form.patchValue({
      adresse: {
        numero: loadedAddress.numero,
        adresse: loadedAddress.adresse,
        ville: {
          nom: loadedAddress.ville.nom,
          code_postal: loadedAddress.ville.code_postal,
          lon: loadedAddress.ville.lon,
          lat: loadedAddress.ville.lat
        }
      }
    });
  }

  submit() {
    if (this.form.invalid) {
      this.toastr.error('Merci de remplir tous les champs!');
      return;
    }
    const newCity: City = this.form.value.adresse.ville;
    this.cityService.add(newCity).subscribe({
      next: (data: any) => {
        // this.store.dispatch({ type: '[formations] Ajouter formations', data });
        const newAddress: Address = {
          id: -1,
          numero: this.form.value.adresse.numero,
          adresse: this.form.value.adresse.adresse,
          ville: data,
        };
        this.addressService.add(newAddress).subscribe({
          next: (data: any) => {
            const newFormer: Former = {
              id: -1,
              nom: this.form.value.nom,
              prenom: this.form.value.prenom,
              securiteSociale: this.form.value.securiteSociale,
              siret: this.form.value.siret,
              email: this.form.value.email,
              telephone: this.form.value.telephone,
              adresse: data
            }
            console.log(newFormer);
            this.formerService.add(newFormer).subscribe({
              next: () => {
                // this.store.dispatch({ type: '[formations] Ajouter formations', data });
                this.toastr.success('Formateur ajouté avec succès!');
                this.form.reset();
              },
              error: (error) => {
                console.log(error);
                this.toastr.error("Erreur lors de l'ajout d'un formateur!");
              },
            });
            
            // this.store.dispatch({ type: '[formations] Ajouter formations', data });
            this.toastr.success('Adresse ajouté avec succès!');
          },
          error: (error) => {
            this.toastr.error("Erreur lors de l'ajout d'une adresse!");
          },
        });
      },
      error: () => {
        this.toastr.error("Erreur lors de l'ajout d'une ville!");
      },
    });
    this.formerAdded.emit();
  }
}
