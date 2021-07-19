import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import OrderList from '../src/components/order/OrderList';
import OrderMock from './OrderMock';

describe('order list test', () => {
  let expectedOrder;

  beforeAll(() => {
    expectedOrder = OrderMock;
  });

  //TODO capire perchè non è visibile
  test('Order list visibility', () => {
    render(<OrderList orderList={expectedOrder} />);
    expect(screen.getByText(expectedOrder[0].id)).not.toBeVisible();
  });
});
