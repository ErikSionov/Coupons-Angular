import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Page404Component } from './components/page404/page404.component';
import { RootComponent } from './components/root/root.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';
import { MainComponent } from './components/main/main.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { ModalModule } from './modules/modal.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LayoutComponent,
    LoginComponent,
    RootComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    Page404Component,
    MainComponent,
    CompaniesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    ModalModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [
    RootComponent,
  ],
})
export class AppModule {}
