import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingRoutingModule } from './training-routing.module';
import { TrainingsComponent } from './components/trainings/trainings.component';
import { TrainingComponent } from './components/training/training.component';
import { AsidePanelComponent } from './components/training/asidePanel/asidePanel.component';

@NgModule({
  declarations: [
    TrainingsComponent,
    TrainingComponent,
    AsidePanelComponent
  ],
  imports: [
    CommonModule,
    TrainingRoutingModule
  ]
})
export class TrainingsModule { }
