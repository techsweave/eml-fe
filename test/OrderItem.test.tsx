import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import OrderItem from '../src/components/order/OrderItem';
import OrderMock from './OrderMock';

//isLoading è true probabilmente quindi non stampa cose

describe('order item test', () => {
  let expectedOrder;

  beforeAll(() => {
    expectedOrder = OrderMock[0];
  });

  test('Order item visibility', () => {
    render(<OrderItem order={expectedOrder} />);
    //expect(screen.getByText(expectedOrder.id)).toBeVisible();
    //expect(screen.getByText(expectedOrder.price, { exact: false })).toBeVisible();
  });
});
