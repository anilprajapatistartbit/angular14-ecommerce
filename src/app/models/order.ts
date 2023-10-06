import { BillingDetails } from "./billing";
import { Food } from "./food";


export class Order {
  id!:number;
  userId!: number;
  orderDate!: Date;
  currency!: string;
  totalPrice!: number;
  billingDetailsId!:number;
  transactionId!:number;
  BillingDetails!:BillingDetails;
  createdon!:Date;
  }

  export class OrderItem {
  
    orderId?: number;
    foodId!: number;
    quantity!: number;
    price!: number;
    food!:Food;
  }
  