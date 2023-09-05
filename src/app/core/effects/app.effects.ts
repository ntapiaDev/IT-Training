import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import * as appActions from './../stores/app.actions';
import * as areasActions from './../stores/areas/areas.actions';
import * as themesActions from './../stores/themes/themes.actions';
import * as trainingsActions from './../stores/trainings/trainings.actions';
import * as trainingSessionsActions from './../stores/trainingSession/trainingSessions.actions';
import { AreaService } from './../services/area.service';
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
          this.AreaService.getAll(),
          this.ThemeService.getAll(),
          this.TrainingService.getAll(),
          this.TrainingSessionService.getAll()          
        ]).pipe(
          map(([areas, themes, trainings, trainingSessions]) => {
            return {    
                areasActions: areasActions.getAreas({ areas }),
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
          actions.themesActions,
          actions.trainingsActions,
          actions.trainingSessionsActions
        ];
      })
    )
  );

  constructor(private actions$: Actions, private AreaService: AreaService, private ThemeService: ThemeService, private TrainingService: TrainingService, private TrainingSessionService: TrainingSessionService) {}
}
