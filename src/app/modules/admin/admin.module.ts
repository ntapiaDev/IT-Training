import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { BackOfficeComponent } from './components/back-office/back-office.component';
import { TableComponent } from './components/table/table.component';

@NgModule({
  declarations: [
    BackOfficeComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
