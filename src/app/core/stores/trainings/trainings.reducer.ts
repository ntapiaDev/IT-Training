import { createReducer, on } from '@ngrx/store';
import { addTraining, deleteTraining, editTraining, getTrainings } from './trainings.actions';
import { Training } from '../../models/Training';

export const initialState: Training[] = [];

export const trainingsReducer = createReducer(
  initialState,
  on(getTrainings, (_, { trainings }) => trainings),
  on(addTraining, (state, { data }) => [...state, data]),
  on(editTraining, (state, { data }) =>
    state.map((existingTraining) =>
    existingTraining.id === data.id ? data : existingTraining
    )
  ),
  on(deleteTraining, (state, { id }) => state.filter((training) => training.id !== id))
);
