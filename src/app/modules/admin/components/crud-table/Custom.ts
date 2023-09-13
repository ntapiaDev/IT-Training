import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { City } from 'src/app/core/models/Address';
import { Area } from 'src/app/core/models/Area';
import { Theme } from 'src/app/core/models/Theme';
import { Training } from 'src/app/core/models/Training';
import { TrainingSession } from 'src/app/core/models/TrainingSession';
import { AreaService } from 'src/app/core/services/area.service';
import { CityService } from 'src/app/core/services/city.service';
import { ThemeService } from 'src/app/core/services/theme.service';
import { TrainingService } from 'src/app/core/services/training.service';
import { TrainingSessionService } from 'src/app/core/services/trainingSession.service';

export type CustomType = Area | City | Theme | Training | TrainingSession | any;

export type CustomService = AreaService | CityService | ThemeService | TrainingService | TrainingSessionService;

export interface CustomStore {
  areas: Area[];
  cities: City[];
  themes: Theme[];
  trainings: Training[];
  trainingSessions: TrainingSession[];
}

@Injectable()
export class CustomServices {
  constructor(
    public areaService: AreaService,
    public cityService: CityService,
    public themeService: ThemeService,
    public trainingService: TrainingService,
    public trainingSessionService: TrainingSessionService
  ) {}
}

export const init = (currentTab: string, customServices: CustomServices, store: Store<CustomStore>) => {
  let currentService!: CustomService;
  let selectedStore!: Observable<CustomType[]>;

  if (currentTab === 'domaines') {
    currentService = customServices.areaService;
    selectedStore = store.select('areas');
  } else if (currentTab === 'themes') {
    currentService = customServices.themeService;
    selectedStore = store.select('themes');
  } else if (currentTab === 'formations') {
    currentService = customServices.trainingService;
    selectedStore = store.select('trainings');
  } else if (currentTab === 'sessions') {
    currentService = customServices.trainingSessionService;
    selectedStore = store.select('trainingSessions');
  } else if (currentTab === 'villes') {
    currentService = customServices.cityService;
    selectedStore = store.select('cities');
  }
  return [currentService, selectedStore];
}

export const getData = (form: FormGroup, tab: string) => {
  let data!: CustomType;

  switch (tab) {
    case 'domaines':
      data = {
        id: form.value.id,
        nom: form.value.nom,
        description: form.value.description
      };
      break;
    case 'themes':
      data = {
        id: form.value.id,
        nom: form.value.name,
        description: form.value.icon,
        domaine_id: form.value.domaine_id
      };
      break;
    case 'formations':
      data = {
        id: form.value.id,
        nom: form.value.name,
        description: form.value.description,
        duree: parseInt(form.value.duree),
        prix: parseInt(form.value.prix),
        prerequis: parseInt(form.value.prerequis),
        theme_id: parseInt(form.value.theme_id)
      };
      break;
    case 'sessions':
      data = {
        id: form.value.id,
        type: form.value.type,
        formation: parseInt(form.value.formation_id),
        dateDebut: form.value.dateDebut,
        dateFin: form.value.dateFin,
        centre: parseInt(form.value.centre_id),
        formateur: parseInt(form.value.formateur_id),
        nombreParticipants: form.value.nombreParticipants,
        remote: ['true', true].includes(form.value.remote)
      };
      break;
  }
  return data;
}
