import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import ProductItem from '../src/components/product/ProductItem';
import productMock from './ProductMock';

describe('ProductItem', () => {
  let expectedProd;

  beforeAll(() => {
    // eslint-disable-next-line prefer-destructuring
    expectedProd = productMock[0];
  });

  test('test product item title', () => {
    render(<ProductItem product={expectedProd} key={expectedProd.id} />);
    expect(screen.getByText(expectedProd.title, { exact: false })).toBeVisible();
  });

  test('test product item image', () => {
    render(<ProductItem product={expectedProd} key={expectedProd.id} />);
    expect(screen.getByAltText(expectedProd.title, { exact: false })).toBeVisible();
  });

  test('test product item price', () => {
    render(<ProductItem product={expectedProd} key={expectedProd.id} />);
    expect(screen.getByText(expectedProd.price, { exact: false })).toBeVisible();
  });
});
