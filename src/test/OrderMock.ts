import { Models } from 'utilities-techsweave';
import OrderedProductsMock from './OrderedProductsMock';

const OrderMock: Models.Tables.IOrder[] = [
  {
    id: 'ordine1',
    userId: '',
    date: new Date('2021-06-10'),
    status: '',
    products: OrderedProductsMock,
  },
];

export default OrderMock;
