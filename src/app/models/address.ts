import { User } from "./user";

export class Address {
    id!: number;
    country!: string;
    userId!: number;
    user!: User; 
    state!: string;
    streetAddress!: string;
    zipCode!: string;
  }
  