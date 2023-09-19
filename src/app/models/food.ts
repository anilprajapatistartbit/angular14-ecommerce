export class Food {
  id!: number;
  name!: string;
  type!: string;
  price!: number;
  quantity!: number;
  available?: boolean;
  isInCart!: boolean;
  description?: string;
  images: Image[] = []; // An array of Image objects
}

export class Image {
  id!: number;
  url!: string;
  foodId!: number;
 
}
