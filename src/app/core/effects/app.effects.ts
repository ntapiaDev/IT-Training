import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import * as appActions from './../stores/app.actions';
import * as addressesActions from './../stores/addresses/addresses.actions';
import * as areasActions from './../stores/areas/areas.actions';
import * as centersActions from './../stores/centers/centers.actions';
import * as citiesActions from './../stores/cities/cities.actions';
import * as formersActions from './../stores/formers/formers.actions';
import * as themesActions from './../stores/themes/themes.actions';
import * as trainingsActions from './../stores/trainings/trainings.actions';
import * as trainingSessionsActions from './../stores/trainingSession/trainingSessions.actions';
import { AddressService } from './../services/address.service';
import { AreaService } from './../services/area.service';
import { CenterService } from './../services/center.service';
import { FormerService } from './../services/former.service';
import { ThemeService } from './../services/theme.service';
import { TrainingService } from './../services/training.service';
import { TrainingSessionService } from './../services/trainingSession.service';
import { CityService } from '../services/city.service';

@Injectable()
export class AppEffects {
  appInit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.appInit),
      switchMap(() => {     
        return forkJoin([
          this.addressService.getAll(),
          this.areaService.getAll(),
          this.centerService.getAll(),
          this.cityService.getAll(),
          // this.formerService.getAll(),
          this.themeService.getAll(),
          this.trainingService.getAll(),
          this.trainingSessionService.getAll()          
        ]).pipe(
          // map(([addresses, areas, centers, cities, formers, themes, trainings, trainingSessions]) => {
          map(([addresses, areas, centers, cities, themes, trainings, trainingSessions]) => {
            return {
                addressesActions: addressesActions.getAddresses({ addresses }),
                areasActions: areasActions.getAreas({ areas }),
                centersActions: centersActions.getCenters({ centers }),
                citiesActions: citiesActions.getCities({ cities }),
                // formersActions: formersActions.getFormers({ formers }),
                themesActions: themesActions.getThemes({ themes }),
                trainingsActions: trainingsActions.getTrainings({ trainings }),
                trainingSessionsActions: trainingSessionsActions.getTrainingSessions({ trainingSessions })
            };
          })
        );
      }),
      switchMap((actions) => {
        return [
          actions.addressesActions,
          actions.areasActions,
          actions.centersActions,
          actions.citiesActions,
          // actions.formersActions,
          actions.themesActions,
          actions.trainingsActions,
          actions.trainingSessionsActions
        ];
      })
    )
  );

  constructor(private actions$: Actions, private addressService: AddressService, private areaService: AreaService, private centerService: CenterService, private cityService: CityService, private formerService: FormerService, private themeService: ThemeService, private trainingService: TrainingService, private trainingSessionService: TrainingSessionService) {}
}
