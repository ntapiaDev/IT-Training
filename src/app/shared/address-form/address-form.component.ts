import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { FullAddress } from 'src/app/core/models/Address';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent {
  @Output() addressEvent: EventEmitter<FullAddress> = new EventEmitter<FullAddress>();

  address = '';
  adressList: any[] = [];

  constructor(private http: HttpClient) { }

  getAddress() {
    if (this.address.length > 2) {
      const url = 'https://api-adresse.data.gouv.fr/search/';
      const address: Observable<any> = this.http.get(`${url}?q=${this.address}`);
      address.subscribe(data => this.adressList = data.features);
    }
  }

  setAddress(address: any) {
    const fullAddress: FullAddress = {
      numero: address.properties.housenumber,
      adresse: address.properties.street,
      ville: {
        nom: address.properties.city,
        code_postal: address.properties.postcode,
        long: address.geometry.coordinates[0],
        lat: address.geometry.coordinates[1]
      }
    }
    this.addressEvent.emit(fullAddress);
    this.address = address.properties.label;
    this.adressList = [];
  }
}
