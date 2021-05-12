import product from '@models/product'
export default interface Cart {
    readonly id: string;
    readonly productId: string;
    readonly customerId: string;
    readonly quantity: number;
    readonly totalPrice: number;
}
