import { createAction, props } from '@ngrx/store';
import { Area } from './Area';

export const getAreas = createAction('[Areas] Get Areas', props<{ areas: Area[] }>());
