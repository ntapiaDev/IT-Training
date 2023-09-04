import { createReducer, on } from '@ngrx/store';
import { addTrainingSession, deleteTrainingSession, editTrainingSession, getTrainingSessions } from './trainingSessions.actions';
import { TrainingSession } from '../../models/TrainingSession';

export const initialState: TrainingSession[] = [
  {
    id: 1,
    name: "Java - Rouen",
    formation_id: 1,
    date: 16
  },
  {
    id: 2,
    name: "Java - Paris",
    formation_id: 1,
    date: 16
  },
  {
    id: 3,
    name: "PHP - Rouen",
    formation_id: 2,
    date: 16
  },
];

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
