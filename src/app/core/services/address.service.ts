import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Address } from '../models/Address';
import { server_url } from './server';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private readonly serverUrl = `${server_url}/adresses`;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Address[]>(this.serverUrl);
  }

  add(address: Address) {
    return this.http.post(this.serverUrl, address, this.httpOptions);
  }

  update(address: Address) {
    return this.http.put(`${this.serverUrl}/${address.id}`, address, this.httpOptions);
  }

  delete(id: number) {
    return this.http.delete(`${this.serverUrl}/${id}`);
  }
}
