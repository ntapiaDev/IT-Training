import { createReducer, on } from '@ngrx/store';
import { getAreas } from './areas.actions';
import { Area } from './Area';

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
);
