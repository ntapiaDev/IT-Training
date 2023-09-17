import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { getSession, getSessionSuccess, getSessionFailure } from '../stores/session/session.actions';

@Injectable()
export class SessionEffects {
  loadSession$ = createEffect(() =>
  this.actions$.pipe(
    ofType(getSession),
    switchMap(() => {
      return this.authService.getSession().pipe(
        map(session => getSessionSuccess({ session })),
        catchError(error => of(getSessionFailure({ error })))
      );
    })
  )
);

  constructor(private actions$: Actions, private authService: AuthService) {}
}
