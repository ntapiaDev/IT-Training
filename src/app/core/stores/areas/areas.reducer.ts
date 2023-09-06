import { createReducer, on } from '@ngrx/store';
import { addArea, deleteArea, editArea, getAreas } from './areas.actions';
import { Area } from '../../models/Area';

export const initialState: Area[] = [];

export const areasReducer = createReducer(
  initialState,
  on(getAreas, (state, { areas }) => areas),
  on(addArea, (state, { data }) => [...state, data]),
  on(editArea, (state, { data }) =>
    state.map((existingArea) =>
    existingArea.id === data.id ? data : existingArea
    )
  ),
  on(deleteArea, (state, { id }) => state.filter((area) => area.id !== id)),
);
