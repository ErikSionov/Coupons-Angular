import { Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  acceptedToken = false;

  userName = '';

  constructor(private httpClient: HttpClient) { }

  public login(email: string, password: string) {
    let url = environment.baseUrl + 'login';
    let body = 'email=' + email + '&password=' + password;
    let httpHeaders = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded',
    );
    let options: any = { headers: httpHeaders, responseType: 'text' };
    return this.httpClient.post(url, body, options);
  }
}
