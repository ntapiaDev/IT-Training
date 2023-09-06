import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Area } from 'src/app/core/models/Area';
import { Theme } from 'src/app/core/models/Theme';
import { Training } from 'src/app/core/models/Training';
import { TrainingSession } from 'src/app/core/models/TrainingSession';
import { AreaService } from 'src/app/core/services/area.service';
import { ThemeService } from 'src/app/core/services/theme.service';
import { TrainingService } from 'src/app/core/services/training.service';
import { TrainingSessionService } from 'src/app/core/services/trainingSession.service';

export type CustomType = Area | Theme | Training | TrainingSession;

export type CustomService = AreaService | ThemeService | TrainingService | TrainingSessionService;

export interface CustomStore {
  areas: Area[];
  themes: Theme[];
  trainings: Training[];
  trainingSessions: TrainingSession[];
}

@Injectable()
export class CustomServices {
  constructor(
    public areaService: AreaService,
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
  }
  
  return [currentService, selectedStore];
}
