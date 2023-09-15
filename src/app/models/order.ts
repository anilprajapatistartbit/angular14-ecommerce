
  // order.model.ts
export class Order {
  userId!: number;
  orderDate!: Date;
  currency!: string;
  totalPrice!: number;
  }

  export class OrderItem {
  
    orderId?: number;
    foodId!: number;
    quantity!: number;
    price!: number;
  }
  