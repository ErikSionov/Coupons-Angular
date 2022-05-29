import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Customer } from '../models/customer.model';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  private getTokenHeader(): HttpHeaders {
    let token = sessionStorage.getItem('token');
    token = token !== null ? token : '';
    return new HttpHeaders().set('token', token);
  }

  public getAllCustomers() {
    let url = this.baseUrl + '/api/admin/customer/all';
    let header = this.getTokenHeader();
    return this.httpClient.get<Customer[]>(url, { headers: header });
  }

  public getOneCustomer(num: number) {
    let url = this.baseUrl + '/api/admin/customer/' + num;
    let header = this.getTokenHeader();
    return this.httpClient.get<Customer>(url, { headers: header });
  }

  public addCustomer(customer: Customer) {
    let url = this.baseUrl + '/api/admin/customer/add';
    let header = this.getTokenHeader();
    return this.httpClient.post(url, customer, { headers: header });
  }

  public deleteCustomer(num: number) {
    let url = this.baseUrl + '/api/admin/customer/delete/' + num;
    let header = this.getTokenHeader();
    return this.httpClient.delete(url, { headers: header });
  }

  public searchCustomers(search: string) {
    let url = this.baseUrl + '/api/admin/customer/search/' + search;
    return this.httpClient.get<Customer[]>(url, { headers: this.getTokenHeader() });
  }
}
