import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css',
  ],
})
export class LoginComponent implements OnInit {
  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {}

  public login(email: string, password: string) {
    console.log('login called' + email + password);
    this.loginService.login(email, password).subscribe({
      next: (token) => {
        sessionStorage.setItem('token', token.toString());
        console.log(sessionStorage.getItem('token'));
        this.router.navigate([
          'welcome/companies',
        ]);
      },
      error: (err) => {
        let errorObject = JSON.parse(err.error);
        console.log(errorObject);
        console.log(errorObject.error + ': ' + errorObject.message);
      },
      complete: () => {
        this.loginService.acceptedToken = true;
        this.loginService.userName = 'change next';
      },
    });
  }
}
