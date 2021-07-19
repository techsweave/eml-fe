import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import CartItem from '../src/components/cart/CartItem';
import productMock from './ProductMock';

describe('cart item test', () => {
  let expectedItem;

  beforeAll(() => {
    // eslint-disable-next-line prefer-destructuring
    expectedItem = productMock[0];
  });

  test('cartItem visibility', () => {
    render(<CartItem cartItem={expectedItem} />);
    expect(screen.getByText(expectedItem.title)).toBeVisible();
    expect(screen.getByText(expectedItem.price, { exact: false })).toBeVisible();
  });
});
