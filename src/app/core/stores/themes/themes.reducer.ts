import { createReducer, on } from '@ngrx/store';
import { addTheme, deleteTheme, editTheme, getThemes } from './themes.actions';
import { Theme } from '../../models/Theme';

export const initialState: Theme[] = [
  {
    id: 1,
    name: "Langages de programmation",
    icon: "langages"
  },
  {
    id: 2,
    name: "Bases de données",
    icon: "bases"
  },
  {
    id: 3,
    name: "No-Code",
    icon: "no-code"
  },
  {
    id: 4,
    name: "Sécurité informatique",
    icon: "securite"
  },
  {
    id: 5,
    name: "Réseau",
    icon: "reseau"
  }
];

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
