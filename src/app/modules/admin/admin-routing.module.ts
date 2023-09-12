import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AddCenterComponent } from './components/admin-dashboard/add-center/add-center.component';
import { AddFormerComponent } from './components/admin-dashboard/add-former/add-former.component';
import { AddTrainingComponent } from './components/admin-dashboard/add-training/add-training.component';
import { BackOfficeComponent } from './components/back-office/back-office.component';
import { CrudTableComponent } from './components/crud-table/crud-table.component';

const crudRoutes = [
  'domaines',
  'themes',
  'formations',
  'sessions',
  'evaluations',
  'formateurs',
  'candidats',
  'entreprises',
  'adresses',
  'villes',
].map((route) => ({ path: route, component: CrudTableComponent }));

const routes: Routes = [
  {
    path: '',
    component: BackOfficeComponent,
    children: [
      { path: '', component: AdminDashboardComponent },
      { path: 'ajouter-une-formation', component: AddTrainingComponent },
      { path: 'ajouter-un-centre', component: AddCenterComponent },
      { path: 'ajouter-un-formateur', component: AddFormerComponent },
      ...crudRoutes,
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
