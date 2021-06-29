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

export function getOrderById() {
  return OrderMock.map((oM) => ({
    params: {
      id: oM.id,
    },
  }));
}

export function getOrdersData(id: string) {
  let order: Models.Tables.IOrder;
  let orders: any;
  for (let i = 0; i < OrderMock.length; i += 1) {
    if (OrderMock[i].id === id) orders = OrderMock[i];
  }
  order = orders;
  return order;
}

export default OrderMock;
