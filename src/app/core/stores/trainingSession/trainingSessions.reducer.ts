import { createReducer, on } from '@ngrx/store';
import { addTrainingSession, deleteTrainingSession, editTrainingSession, getTrainingSessions } from './trainingSessions.actions';
import { TrainingSession } from '../../models/TrainingSession';

export const initialState: TrainingSession[] = [];

export const trainingSessionsReducer = createReducer(
  initialState,
  on(getTrainingSessions, (_, { trainingSessions }) => trainingSessions),
  on(addTrainingSession, (state, { trainingSession }) => [...state, trainingSession]),
  on(editTrainingSession, (state, { trainingSession }) =>
    state.map((existingTrainingSession) =>
    existingTrainingSession.id === trainingSession.id ? trainingSession : existingTrainingSession
    )
  ),
  on(deleteTrainingSession, (state, { id }) => state.filter((trainingSession) => trainingSession.id !== id))
);
