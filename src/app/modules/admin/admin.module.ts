import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AddAreaComponent } from './components/admin-dashboard/add-training/add-area/add-area.component';
import { AddCenterComponent } from './components/admin-dashboard/add-center/add-center.component';
import { AddFormerComponent } from './components/admin-dashboard/add-former/add-former.component';
import { AddSessionComponent } from './components/admin-dashboard/add-session/add-session.component';
import { AddThemeComponent } from './components/admin-dashboard/add-training/add-theme/add-theme.component';
import { AddTrainingComponent } from './components/admin-dashboard/add-training/add-training.component';
import { DetailsComponent } from './components/admin-dashboard/details/details.component';
import { BackOfficeComponent } from './components/back-office/back-office.component';
import { CrudTableComponent } from './components/crud-table/crud-table.component';
import { FormComponent } from './components/crud-table/form/form.component';
import { CustomServices } from './components/crud-table/Custom';
import { AdminEffects } from 'src/app/core/effects/admin.effects';
import { addressesReducer } from 'src/app/core/stores/addresses/addresses.reducer';
import { centersReducer } from 'src/app/core/stores/centers/centers.reducer';
import { citiesReducer } from 'src/app/core/stores/cities/cities.reducer';
import { formersReducer } from 'src/app/core/stores/formers/formers.reducer';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    BackOfficeComponent,
    AdminDashboardComponent,
    DetailsComponent,
    AddSessionComponent,
    AddAreaComponent,
    AddThemeComponent,
    AddTrainingComponent,
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
    SharedModule,
    EffectsModule.forFeature([AdminEffects]),
    StoreModule.forFeature( 'admin', {
      address: addressesReducer,
      centers: centersReducer,
      cities: citiesReducer,
      formers: formersReducer
    }),
  ],
  providers: [CustomServices]
})
export class AdminModule { }
