import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Company } from 'src/app/models/company.model';
import { CompanyService } from '../../services/company.service';
import { ModalService } from '../../services/modal.service';
import { filter, Observable } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: [
    './main.component.css',
  ],
})
export class MainComponent implements OnInit {
  companies$: Observable<Company[]> = this.companyService.companiesSubject$;
  company: Company = new Company();
  tempCompany: Company = new Company();

  constructor(private companyService: CompanyService, public modalService: ModalService) {}

  ngOnInit(): void {
    this.companies$ = this.companyService.companiesSubject$;
    this.companyService.GetCompanies('all');
  }

  public getAll() {
    this.companyService.GetCompanies('all');
  }

  public deleteCompany(num: number | undefined) {
    if (typeof num !== 'number') {
      return;
    }
    this.companyService.DeleteCompany(num).pipe();
    // num = <number>num;
    // this.companyService.DeleteCompany(num).subscribe({
    //   next: (response) => {
    //     console.log(`company ${num} delete completed`);
    //   },
    //   error: (err) => {
    //     console.log(err.error);
    //   },
    // });
  }

  public addCompany() {
    this.companyService.AddCompany(this.company).subscribe(
      {
        // next: (response) => {
        //   console.log(response);
        //   this.company.id = response as number;
        //   this.companies.push(this.company);
        //   console.log(`added company with id: ${response}`);
        // },
        // error: (err) => {
        //   console.log(err.error);
        // },
      },
    );
  }

  public updateCompany() {
    this.companyService.UpdateCompany(this.company).subscribe(
      {
        // next: (response) => {
        //   console.log(response);
        //   this.companies.filter((x) => {
        //     x.id === this.company.id ? (x = this.company) : (x = x);
        //   });
        //   console.log(`updated company with id: ${response}`);
        // },
        // error: (err) => {
        //   console.log(err.error);
        // },
        // complete: () => {},
      },
    );
  }

  public resetForm() {
    console.log('reset form company');
    this.company = new Company();
  }
}
