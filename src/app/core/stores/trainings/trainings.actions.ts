import { createAction, props } from '@ngrx/store';
import { Training } from '../../models/Training';

export const getTrainings = createAction('[Trainings] Get Trainings', props<{ trainings: Training[] }>());
