import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import AddToCart from '../src/components/cart/AddToCart';
import ProductMock from './ProductMock';


describe('testing add to cart button', () => {

  let expectedProduct;

  beforeAll(() => {
    expectedProduct = ProductMock[0];
  });

  test('button visibility', () => {
    render(<AddToCart product={expectedProduct} quantity={12} />);
    expect(screen.getByText('Add to Cart')).toBeVisible();
  });
});
