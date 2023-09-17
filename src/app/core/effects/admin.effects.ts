import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import * as appActions from './../stores/app.actions';
import * as addressesActions from './../stores/addresses/addresses.actions';
import * as centersActions from './../stores/centers/centers.actions';
import * as citiesActions from './../stores/cities/cities.actions';
import * as formersActions from './../stores/formers/formers.actions';
import { AddressService } from './../services/address.service';
import { CenterService } from './../services/center.service';
import { FormerService } from './../services/former.service';
import { CityService } from '../services/city.service';

@Injectable()
export class AdminEffects {
  adminInit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.adminInit),
      switchMap(() => {  
        return forkJoin([
          this.addressService.getAll(),
          this.centerService.getAll(),
          this.cityService.getAll(),
          this.formerService.getAll()
        ]).pipe(
          map(([addresses, centers, cities, formers]) => {
            return {
                addressesActions: addressesActions.getAddresses({ addresses }),
                centersActions: centersActions.getCenters({ centers }),
                citiesActions: citiesActions.getCities({ cities }),
                formersActions: formersActions.getFormers({ formers })
            };
          })
        );
      }),
      switchMap((actions) => {
        return [
          actions.addressesActions,
          actions.centersActions,
          actions.citiesActions,
          actions.formersActions,
        ];
      })
    )
  );

  constructor(private actions$: Actions, private addressService: AddressService, private centerService: CenterService, private cityService: CityService, private formerService: FormerService) {}
}
