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

  selectedAddress?: Address;

  constructor(private http: HttpClient) { }

  getAddress() {
    if (this.address.length > 2) {
      const url = 'https://api-adresse.data.gouv.fr/search/';
      const address: Observable<any> = this.http.get(`${url}?q=${this.address}`);
      address.subscribe(data => this.adressList = data.features);
    }
  }

  setAddress(address: any) {
    this.selectedAddress = {
      id: -1,
      number: address.properties.housenumber,
      street: address.properties.street,
      zip: address.properties.postcode,
      city: {
        id: -1,
        name: address.properties.city,
        long: address.geometry.coordinates[0],
        lat: address.geometry.coordinates[1]
      }
    }
    this.addressEvent.emit(this.selectedAddress);
  }
}
