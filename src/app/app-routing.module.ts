import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { Page404Component } from './components/page404/page404.component';
import { LoginComponent } from './components/login/login.component';
import { LoginGuard } from './guards/login.guard';
import { CompaniesComponent } from './components/companies/companies.component';
import { MainComponent } from './components/main/main.component';
import { CouponsComponent } from './components/coupons/coupons.component';
import { CustomersComponent } from './components/customer/customers.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'welcome',
    component: LayoutComponent,

    children: [
      {
        path: 'companies',
        component: CompaniesComponent,
        canActivate: [
          LoginGuard,
        ],
      },
      {
        path: 'main',
        component: MainComponent,
        canActivate: [
          LoginGuard,
        ],
      },
      {
        path: 'coupons',
        component: CouponsComponent,
        canActivate: [
          LoginGuard,
        ],
      },
      {
        path: 'customers',
        component: CustomersComponent,
        canActivate: [
          LoginGuard,
        ],
      },
    ],
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule { }
