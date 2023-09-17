import { createAction, props } from '@ngrx/store';
import { TrainingSession } from '../../models/TrainingSession';

export const getTrainingSessions = createAction('[sessions] Charger sessions', props<{ trainingSessions: TrainingSession[] }>());
export const addTrainingSession = createAction('[sessions] Ajouter sessions', props<{ data: TrainingSession }>());
export const editTrainingSession = createAction('[sessions] Editer sessions', props<{ data: TrainingSession }>());
export const deleteTrainingSession = createAction('[sessions] Supprimer sessions', props<{ id: number }>());

export const valideCandidate = createAction('[sessions] Valider candidat', props<{ id: number, username: string }>());
export const invalideCandidate = createAction('[sessions] Invalider candidat', props<{ id: number, username: string }>());
