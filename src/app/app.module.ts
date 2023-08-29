import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { DashboardModule } from './modules/dashboard/dashboard.module';
import { HomeModule } from './modules/home/home.module';
import { TrainingsModule } from './modules/trainings/trainings.module';
import { FooterComponent } from './shared/footer/footer.component';
import { SessionEffects } from './core/effects/session.effects';
import { areasReducer } from './core/stores/areas/areas.reducer';
import { sessionReducer } from './core/stores/session/session.reducer';
import { trainingsReducer } from './core/stores/trainings/trainings.reducer';
import { SharedModule } from './shared/shared.module';

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
    DashboardModule,
    EffectsModule.forRoot([SessionEffects]),
    StoreModule.forRoot({
      areas: areasReducer,
      session: sessionReducer,
      trainings: trainingsReducer
    }),
    SharedModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
