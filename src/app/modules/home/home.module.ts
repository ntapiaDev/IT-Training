import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { AboutComponent } from './components/about/about.component';
import { AreasComponent } from './components/areas/areas.component';
import { AreaComponent } from './components/area/area.component';
import { LandingComponent } from './components/landing/landing.component';
import { RegisterFormComponent } from './components/register/register-form.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    LandingComponent,
    AboutComponent,
    AreasComponent,
    AreaComponent,
    RegisterFormComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class HomeModule { }
