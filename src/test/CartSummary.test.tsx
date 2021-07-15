import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import CartSummary from '../components/cart/CartSummary';
import productMock from './ProductMock';
import cartItemDetailMock from './cartItemDetailMock';
import getTotalMock from './getTotalMock';


describe('CartSummary', () => {
    let expectedCart;

    beforeAll(() =>{
        expectedCart = cartItemDetailMock;
    });

    test('cartSummary visibility', () => {
        render(<CartSummary cart={expectedCart} />);
        let arrayResult = screen.getAllByText(getTotalMock(), { exact:false } );

        arrayResult.forEach((x) => {
            expect(x).toBeVisible;
          });

      });
});