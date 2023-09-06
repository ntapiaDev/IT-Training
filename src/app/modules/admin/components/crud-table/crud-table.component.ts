import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CustomService, CustomServices, CustomStore, CustomType, init } from './Custom';

@Component({
  selector: 'app-crud-table',
  templateUrl: './crud-table.component.html',
  styleUrls: ['./crud-table.component.scss']
})
export class CrudTableComponent {
  currentTab: string;
  currentService!: CustomService;
  currentData!: CustomType[];
  currentKeys: string[] = [];

  data!: CustomType;
  filter: string = '';
  modaleAction: string = '';
  modaleId: number = 0;
  modaleIsOpen: boolean = false
  reversed: boolean = false;
  selected: string = '';

  constructor(
    private route: ActivatedRoute,
    private customServices: CustomServices,
    private store: Store<CustomStore>,
    private toastr: ToastrService
  ) {
    this.currentTab = route.snapshot.url[0].path;

    const [currentService, selectedStore] = init(this.currentTab, this.customServices, this.store) as [CustomService, Observable<CustomType[]>];
    this.currentService = currentService;
    selectedStore.subscribe(data => {
      this.currentData = data;
      if (data.length) this.currentKeys = Object.keys(data[0]);
    });
  }

  toggleModale(action: string = '', id: number = 0) {
    this.data = this.currentData.find(data => data.id === id)!;
    this.modaleAction = action;
    this.modaleId = id;
    this.modaleIsOpen = !this.modaleIsOpen;
  }

  filterData(data: CustomType[]) {
    return data.filter(data => !data.nom || data.nom?.toLowerCase().includes(this.filter.toLowerCase()));
  }

  order(key: string) {
    const doReverse = this.selected === key;
    if (!doReverse) {
      this.selected = key;
      this.reversed = false;
    }
    const newData = [...this.currentData].sort((a, b) => a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0);
    if (doReverse && !this.reversed) {
      newData.reverse();
      this.reversed = true;
    } else {
      this.reversed = false;
    }
    this.currentData = newData;
  }

  delete() {
    const id = this.modaleId;
    //Supprimer les données dans le service
    this.store.dispatch({ type: `[${this.currentTab}] Supprimer ${this.currentTab}`, id });
    this.toastr.success('Entrée supprimée avec succès!');
    this.toggleModale();
  }
}
