import productStyles from '@styles/Product.module.css';
import Link from 'next/link';
import Product from '@models/product';
import React from 'react';

const ProductItem = (prop: { product: Product }) => {
  const { product } = prop;
  return (
    <Link href={{ pathname: '/products/detail/[id]', query: { id: product.id } }}>
      <div className={productStyles.card}>
        <h3>{product.name}</h3>
        <p>
          price:
          {product.price}
          €
        </p>
        <p>{product.description}</p>
      </div>
    </Link>
  );
};

export default ProductItem;
