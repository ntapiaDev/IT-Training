import { createAction, props } from '@ngrx/store';
import { Theme } from '../../models/Theme';

export const getThemes = createAction('[themes] Charger themes', props<{ themes: Theme[] }>());
export const addTheme = createAction('[themes] Ajouter theme', props<{ theme: Theme }>());
export const editTheme = createAction('[themes] Editer theme', props<{ theme: Theme }>());
export const deleteTheme = createAction('[themes] Supprimer themes', props<{ id: number }>());
