import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './pages/home/about/about.component';
import { AreaComponent } from './pages/home/area/area.component';
import { AreasComponent } from './pages/home/areas/areas.component';
import { AsidePanelComponent } from './pages/training/asidePanel/asidePanel.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { HomeComponent } from './pages/home/home.component';
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
    AsidePanelComponent,
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
