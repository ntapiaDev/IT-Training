import { createAction, props } from '@ngrx/store';
import { Theme } from '../../models/Theme';

export const getThemes = createAction('[themes] Charger themes', props<{ themes: Theme[] }>());
export const addTheme = createAction('[themes] Ajouter themes', props<{ data: Theme }>());
export const editTheme = createAction('[themes] Editer themes', props<{ data: Theme }>());
export const deleteTheme = createAction('[themes] Supprimer themes', props<{ id: number }>());
