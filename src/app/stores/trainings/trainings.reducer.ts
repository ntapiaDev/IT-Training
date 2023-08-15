import { createReducer, on } from '@ngrx/store';
import { getTrainings } from './trainings.actions';
import { Training } from './Training';

export const initialState: Training[] = [
  {
    id: 1,
    name: "Java",
    icon: "java",
    theme_id: 1,
    days: 57,
    price: 8000
  },
  {
    id: 2,
    name: "PHP",
    icon: "php",
    theme_id: 1,
    days: 35,
    price: 5500
  },
  {
    id: 3,
    name: "Python",
    icon: "python",
    theme_id: 1,
    days: 5,
    price: 1500
  },
];

export const trainingsReducer = createReducer(
  initialState,
  on(getTrainings, (state, { trainings }) => trainings),
);
