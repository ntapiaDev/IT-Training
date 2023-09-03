import { createReducer, on } from '@ngrx/store';
import { addTraining, deleteTraining, editTraining, getTrainings } from './trainings.actions';
import { Training } from '../../models/Training';

export const initialState: Training[] = [
  {
    id: 1,
    name: "Java",
    reference: "C28GO",
    description: "Langage de programmation polyvalent et orienté objet, apprécié pour sa portabilité et sa performance. Il est utilisé pour créer diverses applications, des logiciels embarqués aux applications d'entreprise complexes.",
    icon: "java",
    theme_id: 1,
    days: 57,
    price: 8000,
    remote: false
  },
  {
    id: 2,
    name: "PHP",
    reference: "K92FE",
    description: "Langage de script côté serveur conçu pour le développement web dynamique. Il permet la création de sites interactifs en se connectant aux bases de données.",
    icon: "php",
    theme_id: 1,
    days: 35,
    price: 5500,
    remote: false
  },
  {
    id: 3,
    name: "Python",
    reference: "T57LQ",
    description: "Langage de programmation polyvalent, axé sur la lisibilité et la simplicité. Il est largement utilisé pour le développement rapide d'applications, l'analyse de données, l'IA et l'automatisation, avec une vaste gamme de bibliothèques disponibles.",
    icon: "python",
    theme_id: 1,
    days: 5,
    price: 1500,
    remote: true
  },
];

export const trainingsReducer = createReducer(
  initialState,
  on(getTrainings, (_, { trainings }) => trainings),
  on(addTraining, (state, { training }) => [...state, training]),
  on(editTraining, (state, { training }) =>
    state.map((existingTraining) =>
    existingTraining.id === training.id ? training : existingTraining
    )
  ),
  on(deleteTraining, (state, { id }) => state.filter((training) => training.id !== id))
);
