import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

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

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}

  onSubmit() {
    if (this.registerForm.invalid) {
      this.toastr.error("Merci de remplir tous les champs!");
      return;
    }

    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;
    const confirmPassword = this.registerForm.value.confirmPassword;

    if (password !== confirmPassword) {
      this.toastr.error("Vos mots de passe ne correspondend pas!");
      return;
    };

    this.isLoading = true;

    this.authService.register(email, password).subscribe(
      response => {
        this.isLoading = false;
        this.authService.login(email, password).subscribe({
          next: (response: any) => {
            this.authService.setToken(response.accessToken);
            this.toastr.success('Connexion effectuée avec succès!');
            this.authService.getSession().subscribe(session => {
              this.store.dispatch({ type: '[Session] Get Session Success', session: this.authService.getSession() });
              this.router.navigate(['/']);
            });
          },
          error: (error) => {
            this.isLoading = false;
            this.toastr.error('Vos identifiants ne sont pas valides!');
          }
        });
      },
      error => {
        this.isLoading = false;
        this.toastr.error('Erreur lors de l\'inscription');
      }
    );
  }
}
