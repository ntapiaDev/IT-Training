import { createAction, props } from '@ngrx/store';
import { Area } from '../../models/Area';

export const getAreas = createAction('[domaines] Charger domaines', props<{ areas: Area[] }>());
export const addArea = createAction('[domaines] Ajouter domaines', props<{ data: Area }>());
export const editArea = createAction('[domaines] Editer domaines', props<{ data: Area }>());
export const deleteArea = createAction('[domaines] Supprimer domaines', props<{ id: number }>());
