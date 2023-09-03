import { createReducer, on } from '@ngrx/store';
import { deleteArea, getAreas } from './areas.actions';
import { Area } from '../../models/Area';

export const initialState: Area[] = [
  {
    id: 1,
    name: "Informatique",
    icon: "informatique"
  },
  {
    id: 2,
    name: "Management",
    icon: "management"
  },
  {
    id: 3,
    name: "Ressources Humaines",
    icon: "rh"
  },
  {
    id: 4,
    name: "Finance",
    icon: "finance"
  },
  {
    id: 5,
    name: "Marketing",
    icon: "marketing"
  }
];

export const areasReducer = createReducer(
  initialState,
  on(getAreas, (state, { areas }) => areas),
  on(deleteArea, (state, { id }) => state.filter((area) => area.id !== id)),
);
