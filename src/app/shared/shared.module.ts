import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedRoutingModule } from './shared-routing.module';
import { AddressFormComponent } from './address-form/address-form.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [HeaderComponent, AddressFormComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule
  ],
  exports: [HeaderComponent, AddressFormComponent],
})
export class SharedModule { }
