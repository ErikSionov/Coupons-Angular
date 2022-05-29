import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { identifierName } from '@angular/compiler';
import { Coupon } from '../models/coupon.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  private baseUrl: string = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  private getTokenHeader(): HttpHeaders {
    let token = sessionStorage.getItem('token');
    token = token != null ? token : '';
    return new HttpHeaders().set('token', token);
  }

  getAllCoupons(): Observable<Coupon[]> {
    let url = this.baseUrl + 'api/admin/customer/allcoupons';
    return this.httpClient.get<Coupon[]>(url, { headers: this.getTokenHeader() });
  }

  getCouponsOfOneCostumer(n: number): Observable<Coupon[]> {
    let url = this.baseUrl + 'api/admin/customer/allcoupons/' + n;
    return this.httpClient.get<Coupon[]>(url, { headers: this.getTokenHeader() });
  }

  public SearchCoupons(str: string) {
    let url = this.baseUrl + `api/admin/customer/search/${str}`
    let headers = this.getTokenHeader();
    let options = { headers: headers };
    return this.httpClient.get<Coupon[]>(url, options);
  }
}
