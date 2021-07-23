import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import RelatedItem from '../src/components/product/detail/RelatedProduct/RelatedItem';
import productMock from './ProductMock';

describe('ProductList', () => {
  let expectedProd;

  beforeAll(() => {
    // eslint-disable-next-line prefer-destructuring
    expectedProd = productMock[0];
  });

  test('test title visible list', () => {
    render(<RelatedItem product={expectedProd} />);
    expect(screen.getByText(expectedProd.title)).toBeVisible();
  });

  test('test product item image', () => {
    render(<RelatedItem product={expectedProd} />);
    expect(screen.getByAltText(expectedProd.title)).toBeVisible();
  });

  test('test title visible list', () => {
    render(<RelatedItem product={expectedProd} />);
    expect(screen.getByText(expectedProd.price, { exact: false })).toBeVisible();
  });
});
