import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, filter, map, Subject, switchMap, Observable, throwError } from 'rxjs';
import { Company } from 'src/app/models/company.model';
import { Customer } from 'src/app/models/customer.model';
import { CompanyService } from '../../services/company.service';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  private searchWordChanged = new Subject<string>();

  public isLoading = false;
  @Input() items?: any[] = [];
  @Input() searchType?: string;
  @Output() itemsChange = new EventEmitter<any[]>();

  constructor(private companyService: CompanyService, private customerService: CustomerService) { }

  ngOnInit(): void {
    if (this.searchType == '') {
      console.error("search type not set in app-search component");
      return;
    }
    if (this.searchType === 'company') {
      this.searchCompany();
    }
    else if (this.searchType === 'customer') {
      this.searchCustomer();
    } else {
      console.error("search type incorrect or undefined");
      return;
    }
  }

  onValueChange(txt: string) {
    // txt = <string>txt;
    // if (txt == '') {
    //   this.companyService.GetCompanies('all').subscribe(
    //     x => this.itemsChange.emit(x)
    //   );
    // }
    this.isLoading = true;
    this.searchWordChanged.next(txt);
  }


  private searchCompany() {
    const t = this.searchWordChanged.pipe(
      debounceTime(500),
      switchMap(searchWord => this.companyService.SearchCompanies(searchWord)));
    t.subscribe({
      next: (x) => {
        if (typeof (x) === 'object') {
          console.log(x);
          this.itemsChange.emit(x);
          this.isLoading = false;
        }
      },
      error: (err) => {
        console.log(err);
        this.itemsChange.emit([]);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  private searchCustomer() {
    const t = this.searchWordChanged.pipe(
      debounceTime(500),
      switchMap(searchWord => this.customerService.searchCustomers(searchWord)));
    t.subscribe({
      next: (x) => {
        if (typeof (x) === 'object') {
          console.log(x);
          this.itemsChange.emit(x);
          this.isLoading = false;
        }
      },
      error: (err) => {
        console.log(err);
        this.itemsChange.emit([]);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
