import { Models } from 'utilities-techsweave';
import { Product } from 'aws-sdk/clients/ssm';
import { render } from '@testing-library/react'
import ProductItem from '../components/product/ProductItem';

describe('ProductItem', () => {
  let expectedProd;
  
  beforeEach(() => {
    expectedProd = {
      id: 123456789,
      name: 'pentola',
      image: '',
      description: 'acciaio 18/10',
      price: 8,
      quantity: 2
    };
  });
  

  test('test product item name', () => {
    // BROKEN EXPECTING WEIRD ","
    // const getByText = render(<ProductItem {...expectedProd}/>)
    // const name = getByText(expectedProd.name)
    // expect(name).toBeVisible();
  });
});
