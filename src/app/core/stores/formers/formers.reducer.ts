import { createReducer, on } from '@ngrx/store';
import { addFormer, deleteFormer, editFormer, getFormers } from './formers.actions';
import { Former } from '../../models/User';

export const initialState: Former[] = [];

export const formersReducer = createReducer(
  initialState,
  on(getFormers, (state, { formers }) => formers),
  on(addFormer, (state, { data }) => [...state, data]),
  on(editFormer, (state, { data }) =>
    state.map((existingFormer) =>
    existingFormer.id === data.id ? data : existingFormer
    )
  ),
  on(deleteFormer, (state, { id }) => state.filter((former) => former.id !== id)),
);
