import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: [
    './layout.component.css',
  ],
})
export class LayoutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
