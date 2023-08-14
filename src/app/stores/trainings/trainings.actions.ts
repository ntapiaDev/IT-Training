import { createAction, props } from '@ngrx/store';
import { Training } from './Training';

export const getTrainings = createAction('[Trainings] Get Trainings', props<{ trainings: Training[] }>());
