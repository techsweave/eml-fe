import Product from '@models/product';
import ProductDetailStyles from '@styles/ProductDetail.module.css';
import React from 'react';

const ProductDetail = (prop: { product: Product }) => {
  const { product } = prop;
  return (
    <div>
      <p className={ProductDetailStyles.bold}>
        name:
        {product.name}
      </p>
      <p>
        description:
        {product.description}
      </p>
      <p>
        price:
        {product.price}
      </p>
    </div>
  );
};

export default ProductDetail;
