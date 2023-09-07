import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TrainingRoutingModule } from './training-routing.module';
import { RegistrationComponent } from './components/registration/registration.component';
import { FormComponent } from './components/registration/form/form.component';
import { SearchBarComponent } from './components/registration/search-bar/search-bar.component';
import { SelectedTrainingComponent } from './components/registration/selected-training/selected-training.component';
import { AsidePanelComponent } from './components/training/asidePanel/asidePanel.component';
import { TrainingComponent } from './components/training/training.component';
import { TrainingsComponent } from './components/trainings/trainings.component';
import { MapComponent } from './components/trainings/map/map.component';

@NgModule({
  declarations: [
    TrainingsComponent,
    MapComponent,
    TrainingComponent,
    AsidePanelComponent,
    RegistrationComponent,
    SearchBarComponent,
    SelectedTrainingComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    TrainingRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TrainingsModule { }
