import { createAction, props } from '@ngrx/store';
import { Session } from '../../models/Session';

export const getSession = createAction('[Session] Get Session');
export const getSessionSuccess = createAction('[Session] Get Session Success', props<{ session: Session }>());
//TODO: remplacer le type de error
export const getSessionFailure = createAction('[Session] Get Session Failure', props<{ error: any }>());
