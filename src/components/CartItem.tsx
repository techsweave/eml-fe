import Product from '@models/product';
import cartStyles from '@styles/Cart.module.css';

const CartItem = (prop: { product: Product }) => (
  <div className={cartStyles.cartRow}>
    <p>{prop.product.name}</p>
    <p>{prop.product.quantity}</p>
    <p>{prop.product.price}</p>
  </div>
);

export default CartItem;
