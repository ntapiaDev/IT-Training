import { createReducer, on } from '@ngrx/store';
import { addCity, deleteCity, editCity, getCities } from './cities.actions';
import { City } from '../../models/Address';

export const initialState: City[] = [];

export const citiesReducer = createReducer(
  initialState,
  on(getCities, (state, { cities }) => cities),
  on(addCity, (state, { data }) => [...state, data]),
  on(editCity, (state, { data }) =>
    state.map((existingCity) =>
    existingCity.id === data.id ? data : existingCity
    )
  ),
  on(deleteCity, (state, { id }) => state.filter((city) => city.id !== id)),
);
