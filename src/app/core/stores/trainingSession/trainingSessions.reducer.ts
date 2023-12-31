import { createReducer, on } from '@ngrx/store';
import {
  addCandidate,
  addTrainingSession,
  deleteTrainingSession,
  editTrainingSession,
  getTrainingSessions,
  invalideCandidate,
  removeCandidate,
  valideCandidate,
} from './trainingSessions.actions';
import { TrainingSession } from '../../models/TrainingSession';

export const initialState: TrainingSession[] = [];

export const trainingSessionsReducer = createReducer(
  initialState,
  on(getTrainingSessions, (_, { trainingSessions }) => trainingSessions),
  on(addTrainingSession, (state, { data }) => [...state, data]),
  on(editTrainingSession, (state, { data }) =>
    state.map((existingTrainingSession) =>
      existingTrainingSession.id === data.id ? data : existingTrainingSession
    )
  ),
  on(deleteTrainingSession, (state, { id }) =>
    state.filter((trainingSession) => trainingSession.id !== id)
  ),
  on(valideCandidate, (state, { id, username }) =>
    state.map((session) => {
      if (session.id === id) {
        return {
          ...session,
          candidats: session.candidats.map((candidat) => {
            if (candidat.username === username) {
              return {
                ...candidat,
                validate: true,
              };
            }
            return candidat;
          }),
        };
      }
      return session;
    })
  ),
  on(invalideCandidate, (state, { id, username }) =>
    state.map((session) => {
      if (session.id === id) {
        return {
          ...session,
          candidats: session.candidats.map((candidat) => {
            if (candidat.username === username) {
              return {
                ...candidat,
                validate: false,
              };
            }
            return candidat;
          }),
        };
      }
      return session;
    })
  ),
  on(addCandidate, (state, { id, candidat }) =>
    state.map((session) => {
      if (session.id === id) {
        return {
          ...session,
          candidats: [...session.candidats, candidat],
        };
      }
      return session;
    })
  ),
  on(removeCandidate, (state, { id, candidat }) =>
    state.map((session) => {
      if (session.id === id) {
        return {
          ...session,
          candidats: session.candidats.filter(c => c.id !== candidat.id),
        };
      }
      return session;
    })
  )
);
