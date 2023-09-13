import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Address, City } from 'src/app/core/models/Address';
import { Center } from 'src/app/core/models/Center';
import { AddressService } from 'src/app/core/services/address.service';
import { CenterService } from 'src/app/core/services/center.service';
import { CityService } from 'src/app/core/services/city.service';

@Component({
  selector: 'app-add-center',
  templateUrl: './add-center.component.html',
  styleUrls: ['./add-center.component.scss'],
})
export class AddCenterComponent {
  @Output() centerAdded = new EventEmitter<void>();

  form: FormGroup;

  constructor(private addressService: AddressService, private centerService: CenterService, private cityService: CityService, private formBuilder: FormBuilder, private store: Store<{ cities: City[] }>, private toastr: ToastrService) {
    this.form = this.formBuilder.group({
      nom: ['', Validators.required],
      adresse: this.formBuilder.group({
        numero: ['', Validators.required],
        adresse: ['', Validators.required],
        ville: this.formBuilder.group({
          nom: ['', Validators.required],
          codePostal: ['', Validators.required],
          lon: [0, Validators.required],
          lat: [0, Validators.required],
        }),
      }),
    });
  }

  loadAddress(loadedAddress: Address) {
    this.form.patchValue({
      adresse: {
        numero: loadedAddress.numero,
        adresse: loadedAddress.adresse,
        ville: {
          nom: loadedAddress.ville.nom,
          codePostal: loadedAddress.ville.codePostal,
          lon: loadedAddress.ville.lon,
          lat: loadedAddress.ville.lat,
        },
      },
    });
  }

  submit() {
    if (this.form.invalid) {
      this.toastr.error('Merci de remplir tous les champs!');
      return;
    }
    const newCity: City = this.form.value.adresse.ville;
    let existingCity = false;
    this.store.select('cities').subscribe(cities => existingCity = cities.some(c => (c.nom === newCity.nom) && (c.codePostal === newCity.codePostal)));
    this.cityService.add(newCity).subscribe({
      next: (data: any) => {
        if (!existingCity) this.store.dispatch({ type: '[villes] Ajouter villes', data });
        const newAddress: Address = {
          id: -1,
          numero: this.form.value.adresse.numero,
          adresse: this.form.value.adresse.adresse,
          ville: data,
        };
        this.addressService.add(newAddress).subscribe({
          next: (data: any) => {
            const newCenter: Center = {
              id: -1,
              nom: this.form.value.nom,
              adresse: data
            }
            this.centerService.add(newCenter).subscribe({
              next: (data) => {
                this.store.dispatch({ type: '[centres] Ajouter centres', data });
                this.toastr.success('Centre ajouté avec succès!');
                this.form.reset();
              },
              error: (error) => {
                this.toastr.error("Erreur lors de l'ajout d'une adresse!");
              },
            });
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
    this.centerAdded.emit();
  }
}
