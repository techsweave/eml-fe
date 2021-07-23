import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import ProductDetail from '../src/components/product/detail/ProductDetail';
import productMock from './ProductMock';
import categoryMock from './CategoryMock';

describe('product detail test', () => {
  let expectedProd;
  let expectedCat;

  beforeAll(() => {
    // eslint-disable-next-line prefer-destructuring
    expectedProd = productMock[0];
    expectedCat = categoryMock;
  });

  test('detail visibility', () => {
    render(<ProductDetail product={expectedProd} category={expectedCat} />);
    expect(screen.getByText(expectedProd.title)).toBeVisible();
    expect(screen.getByAltText(expectedProd.title)).toBeVisible();
    expect(screen.getByText(expectedProd.description)).toBeVisible();
    expect(screen.getByText(expectedProd.price, { exact: false })).toBeVisible();
    expect(screen.getByText(expectedProd.price * expectedCat.taxes * 0.01, { exact: false }))
      .toBeVisible();
  });
});
