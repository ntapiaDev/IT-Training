import { createReducer, on } from '@ngrx/store';
import { addTheme, deleteTheme, editTheme, getThemes } from './themes.actions';
import { Theme } from '../../models/Theme';

export const initialState: Theme[] = [];

export const themesReducer = createReducer(
  initialState,
  on(getThemes, (state, { themes }) => themes),
  on(addTheme, (state, { data }) => [...state, data]),
  on(editTheme, (state, { data }) =>
    state.map((existingTheme) =>
    existingTheme.id === data.id ? data : existingTheme
    )
  ),
  on(deleteTheme, (state, { id }) => state.filter((theme) => theme.id !== id)),
);
