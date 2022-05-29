import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company.model';
import { CompanyService } from '../../services/company.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-main',
  templateUrl: './companies.component.html',
  styleUrls: [
    './companies.component.css',
  ],
})
export class CompaniesComponent implements OnInit {
  companies?: Company[];
  isLoading = true;
  company: Company = new Company(0);
  tempCompany: Company = new Company(0);
  errorMessage: string = 'no valid error message present';

  constructor(private companyService: CompanyService, public modalService: ModalService) { }

  ngOnInit(): void {
    this.getAllCompanies('all');
  }

  public getAllCompanies(callType: string) {
    this.companyService.GetCompanies(callType).subscribe({
      next: (c) => {
        this.companies = c;
      },
    });
  }

  public deleteCompany(num: number | undefined) {
    num = num as number;
    this.companyService.DeleteCompany(num).subscribe({
      next: () => {
        console.log(`deleted company with id: ${num}`)
        this.getAllCompanies('all');
      },
    });
  };

  public addCompany() {
    this.companyService.AddCompany(this.company).subscribe({
      next: (r) => {
        console.log(`added company with id: ${r}`);
        this.getAllCompanies('all');
      },
    });
  }

  public openUpdateCompany(c: Company) {
    this.company = c;
    this.tempCompany = { ...this.company };
    this.modalService.open('edit');
  }

  public closeUpdateCompanyWithoutChanges() {
    this.companies?.map((x) => {
      if (x.id === this.tempCompany.id) {
        x.email = this.tempCompany.email;
        x.password = this.tempCompany.password;
        x.name = this.tempCompany.name;
      }
    });
    this.resetForm();
    this.tempCompany = {};
    this.modalService.close('edit');
  }

  public updateCompany() {
    this.companyService.UpdateCompany(this.company).subscribe({
      next: (response) => {
        console.log(`updated company with id: ${this.company.id}`);
      },
      error: (err) => {
        this.displayErrorMessage(err.error.message);
        console.log(err.error);
        console.log(err.error.message);
        this.closeUpdateCompanyWithoutChanges();
      },
      complete: () => {
      },
    },
    );
  }

  public resetForm() {
    console.log('reset form company');
    this.company = new Company(0);
  }

  public displayErrorMessage(message: string | undefined) {
    this.errorMessage = !message ? this.errorMessage : message;
    this.modalService.open('error');
  }

  public logCompanies() {
    console.log(this.companies);
  }
}
