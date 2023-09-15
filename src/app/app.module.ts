import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideToastr } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AdminModule } from './modules/admin/admin.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { HomeModule } from './modules/home/home.module';
import { TrainingsModule } from './modules/trainings/trainings.module';
import { FooterComponent } from './shared/footer/footer.component';
import { AppEffects } from './core/effects/app.effects';
import { SessionEffects } from './core/effects/session.effects';
import { AuthInterceptor } from "./core/interceptors/auth.interceptor";
import { addressesReducer } from './core/stores/addresses/addresses.reducer';
import { areasReducer } from './core/stores/areas/areas.reducer';
import { centersReducer } from './core/stores/centers/centers.reducer';
import { citiesReducer } from './core/stores/cities/cities.reducer';
import { formersReducer } from './core/stores/formers/formers.reducer';
import { sessionReducer } from './core/stores/session/session.reducer';
import { themesReducer } from './core/stores/themes/themes.reducer';
import { trainingsReducer } from './core/stores/trainings/trainings.reducer';
import { trainingSessionsReducer } from './core/stores/trainingSession/trainingSessions.reducer'; 
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    HomeModule,
    TrainingsModule,
    DashboardModule,
    AdminModule,
    EffectsModule.forRoot([AppEffects, SessionEffects]),
    StoreModule.forRoot({
      areas: areasReducer,
      session: sessionReducer,
      themes: themesReducer,
      trainings: trainingsReducer,
      trainingSessions: trainingSessionsReducer
    }),
    SharedModule
  ],
  providers: [provideToastr({
    timeOut: 3000,
    positionClass: 'toast-top-center',
    // preventDuplicates: true,
  }), { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
