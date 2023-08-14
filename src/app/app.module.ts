import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { AreaComponent } from './components/area/area.component';
import { AreasComponent } from './components/areas/areas.component';
import { HeaderComponent } from './shared/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './shared/footer/footer.component';
import { TrainingComponent } from './pages/training/training.component';
import { TrainingsComponent } from './pages/trainings/trainings.component';
import { areasReducer } from './stores/areas/areas.reducer';
import { trainingsReducer } from './stores/trainings/trainings.reducer';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    AreasComponent,
    AreaComponent,
    TrainingsComponent,
    TrainingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ areas: areasReducer, trainings: trainingsReducer }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
