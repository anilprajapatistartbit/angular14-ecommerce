export class Food{
  id!: number;
  name!: string;
  type!: string;
  price!: number;
  imageUrl!: string;
  quantity!: number;
  available?: boolean;
  isInCart ?: boolean;
}