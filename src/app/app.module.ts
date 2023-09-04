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
import { SessionEffects } from './core/effects/session.effects';
import { AuthInterceptor } from "./core/interceptors/auth.interceptor";
import { areasReducer } from './core/stores/areas/areas.reducer';
import { sessionReducer } from './core/stores/session/session.reducer';
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
    EffectsModule.forRoot([SessionEffects]),
    StoreModule.forRoot({
      areas: areasReducer,
      session: sessionReducer,
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
