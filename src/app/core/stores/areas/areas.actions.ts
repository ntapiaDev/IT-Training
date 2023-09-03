import { createAction, props } from '@ngrx/store';
import { Area } from '../../models/Area';

export const getAreas = createAction('[domaines] Charger domaines', props<{ areas: Area[] }>());
export const deleteArea = createAction('[domaines] Supprimer domaines', props<{ id: number }>());
