import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';
import { ModalService } from '../../services/modal.service';
import { Page404Component } from '../page404/page404.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  public customers?: Customer[];
  public customer: Customer = new Customer();

  constructor(public modalService: ModalService, private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getAllCustomers();
    // this.getOneCustomer(1);
  }

  getAllCustomers() {
    this.customerService.getAllCustomers().subscribe({
      next: (x) => { this.customers = x },
      error: (err) => { console.log(err) },
      complete: () => { console.log('getAllCustomers complete') }
    });
  }

  getOneCustomer(num: number) {
    this.customerService.getOneCustomer(num).subscribe({
      next: (x) => { this.customer = x },
      error: (err) => { console.log(err.error) },
      complete: () => { console.log('one customer retrieved: ' + this.customer.toString()) }
    });
  }

  resetForm() {
    console.log('reset form company');
    this.customer = new Customer();
  }

  logCustomers() { }

  openUpdateCustomer(customer: Customer) { }

  addCustomer() {
    this.customerService.addCustomer(this.customer).subscribe({
      next: (x) => {
        console.log('customer added with id:' + x);
        this.getAllCustomers();
      },
      error: (err) => {
        console.log(err.error.message);
      }
    });
  }

  deleteCustomer(num: number) {
    this.customerService.deleteCustomer(num).subscribe({
      next: (x) => {
        this.getAllCustomers();
      }
    });
  }
}
