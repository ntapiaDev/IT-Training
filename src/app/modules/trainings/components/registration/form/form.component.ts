import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Address, City } from 'src/app/core/models/Address';
import { Session } from 'src/app/core/models/Session';
import { TrainingSession } from 'src/app/core/models/TrainingSession';
import { User } from 'src/app/core/models/User';
import { AddressService } from 'src/app/core/services/address.service';
import { CityService } from 'src/app/core/services/city.service';
import { TrainingSessionService } from 'src/app/core/services/trainingSession.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  @Input() session!: TrainingSession;

  formTarget: string = 'particulier';
  registerForm!: FormGroup;

  constructor(private addressService: AddressService, private cityService: CityService, private formBuilder: FormBuilder, private router: Router, private store: Store<{ session: Session }>, private toastr: ToastrService, private trainingSessionService: TrainingSessionService, private userService: UserService) { }

  ngOnInit() {
    this.store.select('session').subscribe(session => {
      this.registerForm = this.formBuilder.group({
        nom: ['', Validators.required],
        prenom: ['', Validators.required],
        email: [session.email, Validators.required],
        telephone: ['', Validators.required],
        securiteSociale: ['', Validators.required],
        identifiantPoleEmploi: ['', Validators.required],
        adresse: this.formBuilder.group({
          numero: ['', Validators.required],
          adresse: ['', Validators.required],
          ville: this.formBuilder.group({
            nom: ['', Validators.required],
            codePostal: ['', Validators.required],
            lon: [0, Validators.required],
            lat: [0, Validators.required]
          })
        }),
      });
    })
  }

  apply(target: string) {
    this.formTarget = target;
    if (this.formTarget === 'entreprise') {
      this.registerForm.addControl('company', new FormControl('', [Validators.required]));
      this.registerForm.addControl('business', new FormControl('', [Validators.required]));
      this.registerForm.addControl('size', new FormControl('', [Validators.required]));
      this.registerForm.addControl('position', new FormControl('', [Validators.required]));
      this.registerForm.removeControl('securiteSociale');
      this.registerForm.removeControl('identifiantPoleEmploi');
    } else {
      this.registerForm.removeControl('company');
      this.registerForm.removeControl('business');
      this.registerForm.removeControl('size');
      this.registerForm.removeControl('position');
      this.registerForm.addControl('securiteSociale', new FormControl('', [Validators.required]));
      this.registerForm.addControl('identifiantPoleEmploi', new FormControl('', [Validators.required]));
    }
  }

  loadAddress(loadedAddress: Address) {
    this.registerForm.patchValue({
      adresse: {
        numero: loadedAddress.numero,
        adresse: loadedAddress.adresse,
        ville: {
          nom: loadedAddress.ville.nom,
          codePostal: loadedAddress.ville.codePostal,
          lon: loadedAddress.ville.lon,
          lat: loadedAddress.ville.lat
        }
      }
    });
  }

  register() {
    if (this.registerForm.invalid) {
      this.toastr.error('Merci de remplir tous les champs!');
      return;
    }
    const newCity: City = this.registerForm.value.adresse.ville;
    this.cityService.add(newCity).subscribe({
      next: (data: any) => {
        const newAddress: Address = {
          id: -1,
          numero: this.registerForm.value.adresse.numero,
          adresse: this.registerForm.value.adresse.adresse,
          ville: data,
        };
        this.addressService.add(newAddress).subscribe({
          next: (data: any) => {
            const user: User = {
              username: this.registerForm.value.email,
              nom: this.registerForm.value.nom,
              prenom: this.registerForm.value.prenom,
              securiteSociale: this.registerForm.value.securiteSociale,
              identifiantPoleEmploi: this.registerForm.value.identifiantPoleEmploi,
              telephone: this.registerForm.value.telephone,
              adresse: data,
              session: this.session,
              validate: false
            }
            this.userService.convert(user).subscribe({
              next: (data) => {
                this.toastr.success('Votre candidature a bien été envoyée!');
                this.registerForm.reset();
                this.trainingSessionService.storage.delete(this.session.id, false);
                this.router.navigate(['/']);
              },
              error: (error) => {
                console.log(error);
                this.toastr.error("Erreur lors de l'envoi de votre candidature!");
              },
            });
          },
          error: () => {
            this.toastr.error("Erreur lors de l'ajout d'une adresse!");
          },
        });
      },
      error: () => {
        this.toastr.error("Erreur lors de l'ajout d'une ville!");
      },
    });
  }
}
