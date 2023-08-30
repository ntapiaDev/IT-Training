import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  registerForm: FormGroup = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  });
  isLoading = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    this.errorMessage = '';

    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;
    const confirmPassword = this.registerForm.value.confirmPassword;

    if (password !== confirmPassword) {
      this.errorMessage = "Votre mot de passe ne correspond pas";
      return;
    };

    this.isLoading = true;

    this.authService.register(email, password).subscribe(
      response => {
        this.isLoading = false;
        console.log('Inscription réussie !', response);
      },
      error => {
        this.isLoading = false;
        this.errorMessage = 'Erreur lors de l\'inscription';
        console.error('Erreur lors de l\'inscription', error);
      }
    );
  }
}
