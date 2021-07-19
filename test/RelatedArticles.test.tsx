import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Cart from '../src/models/cart';
import RelatedProducts from '../src/components/product/detail/RelatedProduct/RelatedArticles';
import productMock from './ProductMock';

describe('ProductList', () => {
  let c: Cart;
  let expectedProd;

  beforeAll(() => {
    expectedProd = productMock;
  });

  test('test title visible list', () => {
    render(<RelatedProducts product={expectedProd} />);
    expect(screen.getByText(expectedProd[0].title)).toBeVisible();
    expect(screen.getByText(expectedProd[1].title)).toBeVisible();
    expect(screen.getByText(expectedProd[2].title)).toBeVisible();
  });

  test('test product item image', () => {
    render(<RelatedProducts product={expectedProd} key={expectedProd.id} />);
    expect(screen.getByAltText(expectedProd[0].title)).toBeVisible();
    expect(screen.getByAltText(expectedProd[1].title)).toBeVisible();
    expect(screen.getByAltText(expectedProd[2].title)).toBeVisible();
  });

  test('test title visible list', () => {
    render(<RelatedProducts product={expectedProd} />);
    expect(screen.getByText(expectedProd[0].price, { exact: false })).toBeVisible();
    expect(screen.getByText(expectedProd[1].price, { exact: false })).toBeVisible();
    expect(screen.getByText(expectedProd[2].price, { exact: false })).toBeVisible();
  });
});