import { Food } from "./food";


export class Order {
  userId!: number;
  orderDate!: Date;
  currency!: string;
  totalPrice!: number;
  billingdetailsid!:number;
  }

  export class OrderItem {
  
    orderId?: number;
    foodId!: number;
    quantity!: number;
    price!: number;
    food!:Food;
  }
  