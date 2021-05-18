import CartItem from '@components/cart/CartItem';
import Cart from '@models/cart';
import cartStyles from '@styles/Cart.module.css';
import React from 'react';

const CartList = (prop: { cart: Cart[] }) => {
  const { cart } = prop;
  return (
    <div className={cartStyles.cartGrid}>
      {cart.map((products) => (
        <div>
          <CartItem
            product={products.product}
            key={products.id}
          />
        </div>
      ))}

    </div>
  );
};

export default CartList;
