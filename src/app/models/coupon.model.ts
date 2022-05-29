import { Company } from "./company.model";

export class Coupon {

  constructor(
    public id: number,
    public category: string,
    public title: string,
    public description: string,
    public startDate: string,
    public endDate: string,
    public amount: number,
    public price: number,
    public image: string
  ) { }
}
