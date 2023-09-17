import { createReducer, on } from '@ngrx/store';
import { addCenter, deleteCenter, editCenter, getCenters } from './centers.actions';
import { Center } from '../../models/Center';

export const initialState: Center[] = [];

export const centersReducer = createReducer(
  initialState,
  on(getCenters, (state, { centers }) => centers),
  on(addCenter, (state, { data }) => [...state, data]),
  on(editCenter, (state, { data }) =>
    state.map((existingCenter) =>
    existingCenter.id === data.id ? data : existingCenter
    )
  ),
  on(deleteCenter, (state, { id }) => state.filter((center) => center.id !== id)),
);
