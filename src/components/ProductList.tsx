import ProductItem from '@components/ProductItem';
import productStyles from '@styles/Product.module.css';
import product from '@models/product';
import React from 'react';

const ProductList = (prop: { productList: product[] }) => (
  <div className={productStyles.grid}>
    {prop.productList.map((product: product) => (
      <ProductItem
        product={product}
        key={product.id}
      />
    ))}
  </div>
);

export default ProductList;
