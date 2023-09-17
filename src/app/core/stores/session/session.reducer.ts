import { createReducer, on } from '@ngrx/store';
import { getSessionSuccess, getSessionFailure, incrementCart, decrementCart } from './session.actions';
import { Session, UserRole } from '../../models/Session';

export const initialState: Session = {
  role: UserRole.null,
  email: '',
  token: '',
  cart: 0
};

export const sessionReducer = createReducer(
  initialState,
  on(getSessionSuccess, (_, { session }) => session),
  on(getSessionFailure, (state, { error }) => ({ ...state, error })),
  on(incrementCart, (state) => ({ ...state, cart: state.cart + 1 })),
  on(decrementCart, (state) => ({ ...state, cart: state.cart - 1 }))
);
