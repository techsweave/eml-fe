import { Models } from 'utilities-techsweave';
import { Product } from 'aws-sdk/clients/ssm';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import ProductItem from '../components/product/ProductItem';

describe('ProductItem', () => {
  let expectedProd;
  // let container;

  beforeEach(() => {
    expectedProd = {
      id: 123456789,
      title: 'pentola',
      image: '',
      description: 'acciaio 18/10',
      price: 8,
      quantity: 2,
    };
  });

  //  container = document.createElement('div');
  //  document.body.appendChild(container);
  //   afterEach(() => {
  //   // cleanup on exiting
  //   unmountComponentAtNode(container);
  //   container.remove();
  //   container = null;
  // });

  test('test product item name', () => {
    render(<ProductItem product={expectedProd} key={expectedProd.id} />);
    expect(screen.getByText('pentola')).toBeVisible();
  });
});
