import Product from '@models/product';

export default interface Cart {

  // DbModel
  readonly id: string;
  readonly productId: string;
  readonly customerId: string;
  readonly quantity: number;
  readonly totalPrice: number;

  // PageModel
  product?: Product;
}
