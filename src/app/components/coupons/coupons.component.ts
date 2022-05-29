import { Component, OnInit } from '@angular/core';
import { Coupon } from 'src/app/models/coupon.model';
import { ModalService } from '../../services/modal.service';
import { CouponService } from '../../services/coupon.service';

@Component({
  selector: 'app-coupons',
  // template: '<h1>derp</h1>',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css'],
})
export class CouponsComponent implements OnInit {

  public coupons?: Coupon[];
  public coupon?: Coupon;

  constructor(public modalService: ModalService, private couponService: CouponService) { }

  ngOnInit(): void {
    // this.getCustomersCoupons(2)
    this.getAllCoupons();
  }


  getAllCoupons() {
    this.couponService.getAllCoupons().subscribe({
      next: (x) => {
        this.coupons = x;
      },
      error: (err) => {
        console.log(err.error);
      }
    });
  }

  getCustomersCoupons(n: number) {
    this.couponService.getCouponsOfOneCostumer(n).subscribe({
      next: (x) => {
        this.coupons = x;
        console.log(x);
      },
      error: (err) => {
        console.log(err.error);
      }
    });
  }

  resetForm() {

  }

  addCoupon() {

  }

  deleteCoupon(id: number | undefined) {

  }

  logCoupons() {
    console.log(this.coupons);
  }

  updateCoupons() {

  }
}
