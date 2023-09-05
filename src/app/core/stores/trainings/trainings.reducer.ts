import { createReducer, on } from '@ngrx/store';
import { addTraining, deleteTraining, editTraining, getTrainings } from './trainings.actions';
import { Training } from '../../models/Training';

export const initialState: Training[] = [];

export const trainingsReducer = createReducer(
  initialState,
  on(getTrainings, (_, { trainings }) => trainings),
  on(addTraining, (state, { training }) => [...state, training]),
  on(editTraining, (state, { training }) =>
    state.map((existingTraining) =>
    existingTraining.id === training.id ? training : existingTraining
    )
  ),
  on(deleteTraining, (state, { id }) => state.filter((training) => training.id !== id))
);
