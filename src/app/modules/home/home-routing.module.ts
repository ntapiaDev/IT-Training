import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterGuard } from 'src/app/core/guards/register.guard';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component'; 
import { RegisterFormComponent } from './components/register/register-form.component';

const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'connexion', component: LoginComponent, canActivate: [RegisterGuard] },
    { path: 'inscription', component: RegisterFormComponent, canActivate: [RegisterGuard] },
    { path: 'contact', component: ContactFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
