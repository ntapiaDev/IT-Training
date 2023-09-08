import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { DetailsComponent } from './components/admin-dashboard/details/details.component';
import { BackOfficeComponent } from './components/back-office/back-office.component';
import { CrudTableComponent } from './components/crud-table/crud-table.component';
import { FormComponent } from './components/crud-table/form/form.component';
import { CustomServices } from './components/crud-table/Custom';

@NgModule({
  declarations: [
    BackOfficeComponent,
    AdminDashboardComponent,
    DetailsComponent,
    CrudTableComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CustomServices]
})
export class AdminModule { }
