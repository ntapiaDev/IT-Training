import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import * as appActions from './../stores/app.actions';
import * as areasActions from './../stores/areas/areas.actions';
import * as centersActions from './../stores/centers/centers.actions';
import * as themesActions from './../stores/themes/themes.actions';
import * as trainingsActions from './../stores/trainings/trainings.actions';
import * as trainingSessionsActions from './../stores/trainingSession/trainingSessions.actions';
import { AreaService } from './../services/area.service';
import { CenterService } from './../services/center.service';
import { ThemeService } from './../services/theme.service';
import { TrainingService } from './../services/training.service';
import { TrainingSessionService } from './../services/trainingSession.service';

@Injectable()
export class AppEffects {
  appInit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.appInit),
      switchMap(() => {     
        return forkJoin([
          this.areaService.getAll(),
          this.centerService.getAll(),
          this.themeService.getAll(),
          this.trainingService.getAll(),
          this.trainingSessionService.getAll()          
        ]).pipe(
          map(([areas, centers, themes, trainings, trainingSessions]) => {
            return {    
                areasActions: areasActions.getAreas({ areas }),
                centersActions: centersActions.getCenters({ centers }),
                themesActions: themesActions.getThemes({ themes }),
                trainingsActions: trainingsActions.getTrainings({ trainings }),
                trainingSessionsActions: trainingSessionsActions.getTrainingSessions({ trainingSessions })
            };
          })
        );
      }),
      switchMap((actions) => {
        return [
          actions.areasActions,
          actions.centersActions,
          actions.themesActions,
          actions.trainingsActions,
          actions.trainingSessionsActions
        ];
      })
    )
  );

  constructor(private actions$: Actions, private areaService: AreaService, private centerService: CenterService, private themeService: ThemeService, private trainingService: TrainingService, private trainingSessionService: TrainingSessionService) {}
}
