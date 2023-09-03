import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { BackOfficeComponent } from './components/back-office/back-office.component';
import { TableComponent } from './components/table/table.component';
import { FormComponent } from './components/table/form/form.component';

@NgModule({
  declarations: [
    BackOfficeComponent,
    TableComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
