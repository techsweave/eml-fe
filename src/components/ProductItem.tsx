import productStyles from '@styles/Product.module.css';
import Link from 'next/link';
import product from '@models/product';
import React from 'react'

const ProductItem = (prop: { product: product }) => (
  <Link href={{ pathname: '/products/detail/[id]', query: { id: prop.product.id } }}>
    <div className={productStyles.card}>
      <h3>{prop.product.name}</h3>
      <p>
        price:
        {prop.product.price}
        €
      </p>
      <p>{prop.product.description}</p>
    </div>
  </Link>
);

export default ProductItem;
