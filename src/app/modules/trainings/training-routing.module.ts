import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { TrainingsComponent } from './components/trainings/trainings.component';
import { TrainingComponent } from './components/training/training.component';

const routes: Routes = [
    { path: '', component: TrainingsComponent },
    { path: 'inscription', component: RegistrationComponent },
    { path: ':name', component: TrainingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingRoutingModule { }
