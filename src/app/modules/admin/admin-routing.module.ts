import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AddCenterComponent } from './components/admin-dashboard/add-center/add-center.component';
import { AddFormerComponent } from './components/admin-dashboard/add-former/add-former.component';
import { BackOfficeComponent } from './components/back-office/back-office.component';
import { CrudTableComponent } from './components/crud-table/crud-table.component';

const routes: Routes = [
  {
    path: '', component: BackOfficeComponent,
    children: [
      { path: '', component: AdminDashboardComponent },
      { path: 'ajouter-un-centre', component: AddCenterComponent },
      { path: 'ajouter-un-formateur', component: AddFormerComponent },
      { path: 'formations', component: CrudTableComponent },
      { path: 'domaines', component: CrudTableComponent },
      { path: 'themes', component: CrudTableComponent },
      { path: 'sessions', component: CrudTableComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
