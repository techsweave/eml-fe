import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import ProductList from '../components/product/ProductList';
import productMock from './ProductMock';

describe('ProductList', () => {
  let expectedProd;

  beforeAll(() => {
    expectedProd = productMock;
  });

  test('test title visible list', () => {
    render(<ProductList productList={expectedProd} />);
    expect(screen.getByText(expectedProd[0].title)).toBeVisible();
    expect(screen.getByText(expectedProd[1].title)).toBeVisible();
    expect(screen.getByText(expectedProd[2].title)).toBeVisible();
  });

  test('test title visible list', () => {
    render(<ProductList productList={expectedProd} />);
    expect(screen.getByText(expectedProd[0].price, { exact: false })).toBeVisible();
    expect(screen.getByText(expectedProd[1].price, { exact: false })).toBeVisible();
    expect(screen.getByText(expectedProd[2].price, { exact: false })).toBeVisible();
  });
});
