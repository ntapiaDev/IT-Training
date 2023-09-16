import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  @Input() sessionId! : number;

  formTarget: string = 'particulier';
  registerForm!: FormGroup;

  ngOnInit() {
    // Récupérer les infos du user si il y a une session
    this.registerForm = new FormGroup({
      session_id: new FormControl(this.sessionId, [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
      adresse: new FormControl('', [Validators.required]),
      code: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required])
    });
  }

  apply(target: string) {
    this.formTarget = target;
    if (this.formTarget === 'entreprise') {
      this.registerForm.addControl('company', new FormControl('', [Validators.required]));
      this.registerForm.addControl('business', new FormControl('', [Validators.required]));
      this.registerForm.addControl('size', new FormControl('', [Validators.required]));
      this.registerForm.addControl('position', new FormControl('', [Validators.required]));
    } else {
      this.registerForm.removeControl('company');
      this.registerForm.removeControl('business');
      this.registerForm.removeControl('size');
      this.registerForm.removeControl('position');
    }
  }

  register() {
    console.log(this.registerForm.value);
  }
}
