import { Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  public login(email: string, password: string) {
    let url = 'http://localhost:8080/login';
    let body = 'email=' + email + '&password=' + password;
    let httpHeaders = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded',
    );
    let options: any = { headers: httpHeaders, responseType: 'text' };
    return this.httpClient.post(url, body, options);
  }
}
