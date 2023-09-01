import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TrainingRoutingModule } from './training-routing.module';
import { RegistrationComponent } from './components/registration/registration.component';
import { TrainingsComponent } from './components/trainings/trainings.component';
import { TrainingComponent } from './components/training/training.component';
import { AsidePanelComponent } from './components/training/asidePanel/asidePanel.component';

@NgModule({
  declarations: [
    TrainingsComponent,
    TrainingComponent,
    AsidePanelComponent,
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    TrainingRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TrainingsModule { }
