import Product from '@models/product';
// import ProductDetailStyles from '@styles/ProductDetail.module.css';
import React from 'react';
import { Box } from '@chakra-ui/react';

const ProductDetail = (prop: { product: Product }) => {
  const { product } = prop;
  return (
    <Box>
      <p>
        Name:
        {product.name}
      </p>
      <p>
        Description:
        {product.description}
      </p>
      <p>
        Price:
        {product.price}
      </p>
    </Box>
  );
};

export default ProductDetail;
