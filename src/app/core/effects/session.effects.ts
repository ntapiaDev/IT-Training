import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { mergeMap, catchError } from 'rxjs/operators';
import { AuthService } from '../services/authService';
import { getSession, getSessionSuccess, getSessionFailure } from '../stores/session/session.actions';

@Injectable()
export class SessionEffects {
  loadSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getSession),
      mergeMap(() => {
        const session = this.authService.getSession();
        //TODO: gérer l'erreur avec getSessionFailure
        return [getSessionSuccess({ session })];
      })
    )
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
