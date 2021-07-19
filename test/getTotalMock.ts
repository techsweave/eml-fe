import cartItemDetailMock from './cartItemDetailMock';
export default function getTotalMock() {
    let total = 0;
    cartItemDetailMock.forEach((x) => {
      let price = x.price ? x.price : 0;
      total += price * x.quantity;
    });
    return total;
  }