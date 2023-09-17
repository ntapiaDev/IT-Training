import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from 'src/app/core/models/Address';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent {
  @Output() addressEvent: EventEmitter<Address> = new EventEmitter<Address>();

  address = '';
  adressList: any[] = [];

  constructor(private http: HttpClient) { }

  getAddress() {
    if (this.address.length > 3) {
      const url = 'https://api-adresse.data.gouv.fr/search/';
      const address: Observable<any> = this.http.get(`${url}?q=${this.address}`);
      address.subscribe(data => this.adressList = data.features);
    }
  }

  setAddress(address: any) {
    const fullAddress: Address = {
      id: -1,
      numero: address.properties.housenumber,
      adresse: address.properties.street,
      ville: {
        id: -1,
        nom: address.properties.city,
        codePostal: address.properties.postcode,
        lon: address.geometry.coordinates[0],
        lat: address.geometry.coordinates[1]
      }
    }
    this.addressEvent.emit(fullAddress);
    this.address = address.properties.label;
    this.adressList = [];
  }
}
