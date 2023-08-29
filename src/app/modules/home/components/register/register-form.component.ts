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
    username: ['', Validators.required],
    password: ['', Validators.required]
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

    this.isLoading = true;
    this.errorMessage = '';

    const username = this.registerForm.value.username;
    const password = this.registerForm.value.password;

    this.authService.register(username, password).subscribe(
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
