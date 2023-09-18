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
import { appInit } from 'src/app/core/stores/app.actions';
import { addCandidate, removeCandidate } from 'src/app/core/stores/trainingSession/trainingSessions.actions';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  @Input() session!: TrainingSession;
  @Input() foundSession?: TrainingSession;

  formTarget: string = 'particulier';
  registerForm!: FormGroup;

  constructor(private addressService: AddressService, private cityService: CityService, private formBuilder: FormBuilder, private router: Router, private store: Store<{ session: Session }>, private toastr: ToastrService, private trainingSessionService: TrainingSessionService, private userService: UserService) { }

  ngOnInit() {
    this.store.select('session').subscribe(session => {
      let foundUser;
      if (this.foundSession) foundUser = this.foundSession.candidats.find(c => c.username === session.email);
      this.registerForm = this.formBuilder.group({
        nom: [foundUser?.nom ?? '', Validators.required],
        prenom: [foundUser?.prenom ??'', Validators.required],
        email: [session.email, Validators.required],
        telephone: [foundUser?.telephone ?? '', Validators.required],
        securiteSociale: [foundUser?.securiteSociale ?? '', Validators.required],
        identifiantPoleEmploi: [foundUser?.identifiantPoleEmploi ?? '', Validators.required],
        adresse: this.formBuilder.group({
          numero: [foundUser?.adresse.numero ?? '', Validators.required],
          adresse: [foundUser?.adresse.adresse ?? '', Validators.required],
          ville: this.formBuilder.group({
            nom: [foundUser?.adresse.ville.nom ?? '', Validators.required],
            codePostal: [foundUser?.adresse.ville.codePostal ?? '', Validators.required],
            lon: [foundUser?.adresse.ville.lon ?? '', Validators.required],
            lat: [foundUser?.adresse.ville.lat ?? '', Validators.required]
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
              next: (data: any) => {
                this.toastr.success('Votre candidature a bien été envoyée!');
                this.registerForm.reset();
                this.trainingSessionService.storage.delete(this.session.id, false);
                // if (this.foundSession) this.store.dispatch(removeCandidate({ id: this.foundSession.id, candidat: data }));
                // this.store.dispatch(addCandidate({ id: this.session!.id, candidat: data }));
                this.store.dispatch(appInit());
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
