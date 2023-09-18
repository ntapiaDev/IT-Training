import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { AboutComponent } from './components/about/about.component';
import { AreasComponent } from './components/areas/areas.component';
import { AreaComponent } from './components/area/area.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterFormComponent } from './components/register/register-form.component';
import { WhatComponent } from './components/what/what.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { SearchComponent } from './components/search/search.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { CubeComponent } from './components/cube/cube.component';

@NgModule({
  declarations: [
    LandingComponent,
    AboutComponent,
    AreasComponent,
    AreaComponent,
    LoginComponent,
    RegisterFormComponent,
    ContactFormComponent,
    WhatComponent,
    CarouselComponent,
    SearchComponent,
    JobsComponent,
    CubeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class HomeModule { }
