import { createAction, props } from '@ngrx/store';
import { City } from '../../models/Address';

export const getCities = createAction('[villes] Charger villes', props<{ cities: City[] }>());
export const addCity = createAction('[villes] Ajouter villes', props<{ data: City }>());
export const editCity = createAction('[villes] Editer villes', props<{ data: City }>());
export const deleteCity = createAction('[villes] Supprimer villes', props<{ id: number }>());
