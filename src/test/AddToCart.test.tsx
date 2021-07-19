import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import AddToCart from '../components/cart/AddToCart';
import CartMock from './CartMock';

describe('testing add to cart button', () => {
  test('button visibility', () => {
    render(<AddToCart {...CartMock[0]} />);
    expect(screen.getByText('Add to Cart')).toBeVisible();
  });
});
