import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HomeModule } from './modules/home/home.module';
import { TrainingsModule } from './modules/trainings/trainings.module';
import { FooterComponent } from './shared/footer/footer.component';
import { areasReducer } from './core/stores/areas/areas.reducer';
import { trainingsReducer } from './core/stores/trainings/trainings.reducer';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { AuthInterceptor } from "./core/interceptors/auth.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HomeModule,
    TrainingsModule,
    StoreModule.forRoot({ areas: areasReducer, trainings: trainingsReducer }),
    SharedModule,
    HttpClientModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
