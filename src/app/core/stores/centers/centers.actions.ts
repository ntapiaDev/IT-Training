import { createAction, props } from '@ngrx/store';
import { Center } from '../../models/Center';

export const getCenters = createAction('[centres] Charger centres', props<{ centers: Center[] }>());
export const addCenter = createAction('[centres] Ajouter centres', props<{ data: Center }>());
export const editCenter = createAction('[centres] Editer centres', props<{ data: Center }>());
export const deleteCenter = createAction('[centres] Supprimer centres', props<{ id: number }>());
