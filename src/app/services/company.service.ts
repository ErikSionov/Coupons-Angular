import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Company } from '../models/company.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyService implements OnInit {
  private baseUrl = environment.baseUrl;

  private companies = new BehaviorSubject<Company[]>([]);

  get companiesSubject$(): Observable<Company[]> {
    return this.companies.asObservable();
  }

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.GetCompanies('all').subscribe((c) => {
      this.companies.next(c);
    });
  }

  private getTokenHeader(): HttpHeaders {
    let token = sessionStorage.getItem('token');
    token = token != null ? token : '';
    return new HttpHeaders().set('token', token);
  }

  public GetCompanies(callType: string) {
    let url = this.baseUrl + `api/admin/company/${callType}`;
    let options = { headers: this.getTokenHeader() };
    return this.httpClient.get<Company[]>(url, options);
  }

  public DeleteCompany(num: number) {
    let url = this.baseUrl + `api/admin/company/delete/${num}`;
    return this.httpClient.delete(url, { headers: this.getTokenHeader() });
  }

  AddCompany(company: Company) {
    let url = this.baseUrl + `api/admin/company/add`;
    return this.httpClient.post(url, company, { headers: this.getTokenHeader() });
  }

  UpdateCompany(company: Company) {
    let url = this.baseUrl + `api/admin/company/update`;
    return this.httpClient.put(url, company, { headers: this.getTokenHeader() });
  }
}
