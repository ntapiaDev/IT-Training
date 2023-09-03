import { createAction, props } from '@ngrx/store';
import { Training } from '../../models/Training';

export const getTrainings = createAction('[formations] Charger formations', props<{ trainings: Training[] }>());
export const addTraining = createAction('[formations] Ajouter formation', props<{ training: Training }>());
export const editTraining = createAction('[formations] Editer formation', props<{ training: Training }>());
export const deleteTraining = createAction('[formations] Supprimer formations', props<{ id: number }>());
