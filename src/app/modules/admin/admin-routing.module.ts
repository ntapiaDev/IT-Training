import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackOfficeComponent } from './components/back-office/back-office.component';
import { TableComponent } from './components/table/table.component';

const routes: Routes = [
  {
    path: '', component: BackOfficeComponent,
    children: [
      { path: 'formations', component: TableComponent },
      { path: 'domaines', component: TableComponent },
      { path: 'sessions', component: TableComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
