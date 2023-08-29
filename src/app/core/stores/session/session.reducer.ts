import { createReducer, on } from '@ngrx/store';
import { getSessionSuccess, getSessionFailure } from './session.actions';
import { Session, UserRole } from '../../models/Session';

export const initialState: Session = {
  role: UserRole.null,
  token: '',
};

export const sessionReducer = createReducer(
  initialState,
  on(getSessionSuccess, (_, { session }) => session),
  on(getSessionFailure, (state, { error }) => ({ ...state, error }))
);
