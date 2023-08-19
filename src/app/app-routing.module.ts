import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TrainingComponent } from './pages/training/training.component';
import { TrainingsComponent } from './pages/trainings/trainings.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'formations', component: TrainingsComponent },
  { path: 'formations/:name', component: TrainingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
