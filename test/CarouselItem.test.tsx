import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import CarouselItem from '../src/components/home/Carousel/CarouselItem';
import productMock from './ProductMock';

describe('CarouselItem', () => {
  let expectedProd;

  beforeAll(() => {
    expectedProd = productMock[0];
  });

  test('Carousel item visibility', () => {
    render(<CarouselItem product={expectedProd} />);
    expect(screen.getByText(expectedProd.title, { exact: false })).toBeVisible();
    expect(screen.getByText(expectedProd.price, { exact: false })).toBeVisible();
  });
});
