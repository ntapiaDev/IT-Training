import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AddCenterComponent } from './components/admin-dashboard/add-center/add-center.component';
import { AddFormerComponent } from './components/admin-dashboard/add-former/add-former.component';
import { AddSessionComponent } from './components/admin-dashboard/add-session/add-session.component';
import { DetailsComponent } from './components/admin-dashboard/details/details.component';
import { BackOfficeComponent } from './components/back-office/back-office.component';
import { CrudTableComponent } from './components/crud-table/crud-table.component';
import { FormComponent } from './components/crud-table/form/form.component';
import { CustomServices } from './components/crud-table/Custom';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    BackOfficeComponent,
    AdminDashboardComponent,
    DetailsComponent,
    AddSessionComponent,
    AddCenterComponent,
    AddFormerComponent,
    CrudTableComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [CustomServices]
})
export class AdminModule { }
