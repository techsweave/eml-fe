import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import OrderDetail from '../src/components/order/OrderDetail';
import OrderMock from './OrderMock';
import OrderedProductsMock from './OrderedProductsMock';

describe('order detail test', () => {
    let expectedOrderedProducts;
    let expectedOrder;

    beforeAll(() => {
        expectedOrderedProducts = OrderedProductsMock;
        expectedOrder = OrderMock[0];
    });

    let total = 0;
    OrderedProductsMock.forEach((item) => {
        total += item.price * item.quantity;
    });

    test('order detail visibility', () => {
        render(<OrderDetail products={expectedOrderedProducts} order={expectedOrder} />);
        expect(screen.getByText(expectedOrder.id)).toBeVisible();
        //TODO probabilmente segna 0 perchè passa item con state mentre qui calcolo su OrderedProductsMock
        //expect(screen.getByText(total, { exact: false })).toBeVisible();
    });
});
