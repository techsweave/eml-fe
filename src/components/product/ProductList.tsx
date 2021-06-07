import ProductItem from '@components/product/ProductItem';
// import productStyles from '@styles/Product.module.css';
import Product from '@models/product';
import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';

const ProductList = (prop: { productList: Product[] }) => {
  const { productList } = prop;
  return (
    <SimpleGrid columns={[1, 2, 3, 4]} spacing="20">
      {productList.map((products) => (
        <ProductItem
          product={products}
          key={products.id}
        />
      ))}
    </SimpleGrid>
  );
};

export default ProductList;
