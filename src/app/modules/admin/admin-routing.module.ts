import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackOfficeComponent } from './components/back-office/back-office.component';
import { CrudTableComponent } from './components/crud-table/crud-table.component';

const routes: Routes = [
  {
    path: '', component: BackOfficeComponent,
    children: [
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
