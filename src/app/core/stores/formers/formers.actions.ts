import { createAction, props } from '@ngrx/store';
import { Former } from '../../models/User';

export const getFormers = createAction('[formateurs] Charger formateurs', props<{ formers: Former[] }>());
export const addFormer = createAction('[formateurs] Ajouter formateurs', props<{ data: Former }>());
export const editFormer = createAction('[formateurs] Editer formateurs', props<{ data: Former }>());
export const deleteFormer= createAction('[formateurs] Supprimer formateurs', props<{ id: number }>());
