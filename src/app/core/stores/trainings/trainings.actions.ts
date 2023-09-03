import { createAction, props } from '@ngrx/store';
import { Training } from '../../models/Training';

export const getTrainings = createAction('[formations] Charger formations', props<{ trainings: Training[] }>());
export const deleteTraining = createAction('[formations] Supprimer formations', props<{ id: number }>());
