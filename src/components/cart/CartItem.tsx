import cartStyles from '@styles/Cart.module.css';
import React from 'react';

const CartItem = (prop) => {
  const { product } = prop;
  return (
    <div className={cartStyles.cartRow}>
      <p>{product.name}</p>
      <p>{product.quantity}</p>
      <p>{product.price}</p>
    </div>
  );
};

export default CartItem;
