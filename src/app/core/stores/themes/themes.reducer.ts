import { createReducer, on } from '@ngrx/store';
import { addTheme, deleteTheme, editTheme, getThemes } from './themes.actions';
import { Theme } from '../../models/Theme';

export const initialState: Theme[] = [];

export const themesReducer = createReducer(
  initialState,
  on(getThemes, (state, { themes }) => themes),
  on(addTheme, (state, { theme }) => [...state, theme]),
  on(editTheme, (state, { theme }) =>
    state.map((existingTheme) =>
    existingTheme.id === theme.id ? theme : existingTheme
    )
  ),
  on(deleteTheme, (state, { id }) => state.filter((theme) => theme.id !== id)),
);
