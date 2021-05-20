import ProductItem from '@components/product/ProductItem';
import productStyles from '@styles/Product.module.css';
import Product from '@models/product';
import React from 'react';

const ProductList = (prop: { productList: Product[] }) => {
  const { productList } = prop;
  return (
    <div className={productStyles.grid}>
      {productList.map((products) => (
        <ProductItem
          product={products}
          key={products.id}
        />
      ))}
    </div>
  );
};

export default ProductList;
