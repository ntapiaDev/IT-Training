import { createAction, props } from '@ngrx/store';
import { TrainingSession } from '../../models/TrainingSession';

export const getTrainingSessions = createAction('[sessions] Charger sessions', props<{ trainingSessions: TrainingSession[] }>());
export const addTrainingSession = createAction('[sessions] Ajouter sessions', props<{ data: TrainingSession }>());
export const editTrainingSession = createAction('[sessions] Editer sessions', props<{ data: TrainingSession }>());
export const deleteTrainingSession = createAction('[sessions] Supprimer sessions', props<{ id: number }>());
