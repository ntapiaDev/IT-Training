import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  isLoading = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private store: Store, private toastr: ToastrService) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.toastr.error('Merci de remplir tous les champs!');
      return;
    }

    this.isLoading = true;

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        this.authService.setToken(response.accessToken);
        this.toastr.success('Connexion effectuée avec succès!');
        this.authService.getSession().subscribe(session => {
          this.store.dispatch({ type: '[Session] Get Session Success', session });
          if (!this.authService.getRedirect()) this.router.navigate(['/']);
        });
      },
      error: (error) => {
        this.isLoading = false;
        this.toastr.error('Vos identifiants ne sont pas valides!');
      }
    });
  }
}
