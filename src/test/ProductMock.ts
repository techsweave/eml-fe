import Product from '@models/product';

const productMock: Product[] = [
  {
    id: '43r2343344',
    name: 'book A. Touring',
    image: '/images/test/aTouring.jpg',
    description: 'Really good book good, with a really good story in a really bad time',
    price: 14.5,
    quantity: 10,
  },
  {
    id: '498324nr98hriu8',
    name: 'Oneplus 8T',
    image: '/images/test/op8T.jpg',
    description: 'Amazing android phone',
    price: 599,
    quantity: 76,
  },
  {
    id: 'kno980u8970',
    name: 'snow sledding',
    image: '/images/test/slittino.PNG',
    description: 'fantastic snow sledding - for winter use only',
    price: 78,
    quantity: 4,
  },
  {
    id: 'rrewr4656346wb33',
    name: 'Bigoli - tipical venetian pasta',
    image: 'images/test/Bigoli.jpg',
    description: 'fantastic venetian pasta, eat it with carbonara or ragù',
    price: 3.5,
    quantity: 1900,
  },
];
export default productMock;

export function getProductById() {
  return productMock.map((pM) => ({
    params: {
      id: pM.id,
    },
  }));
}

export async function getProductsData(id: string) {
  let product: Product;
  for (let i = 0; i < productMock.length; i += 1) {
    if (productMock[i].id === id) product = productMock[i];
  }
  return product;
}
