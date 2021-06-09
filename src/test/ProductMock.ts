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
    image: '/images/test/Bigoli.jpg',
    description: 'fantastic venetian pasta, eat it with carbonara or ragù',
    price: 3.5,
    quantity: 1900,
    },
    {
    id: 'fdsdfdsfsdf',
    name: 'cafe',
    image: '/images/test/Bigoli.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dignissim est in ligula porta, ac pretium lacus aliquam. Vivamus a laoreet ante. Quisque congue ultrices mauris eu viverra. Suspendisse sed dui turpis. Donec non condimentum odio. Donec elementum, sapien at facilisis suscipit, purus lorem vestibulum lectus, vitae finibus ligula felis nec lacus. Nullam ut tellus sodales, sagittis urna nec, molestie nunc. Curabitur pulvinar hendrerit turpis sed vestibulum. Donec molestie lorem luctus finibus rhoncus. Etiam faucibus mauris sed convallis egestas. Sed diam est, tristique vel justo vel, elementum semper augue. Phasellus aliquam pretium tellus, id laoreet dui tincidunt et. Morbi pharetra semper odio id dictum. Proin porta mauris at elementum venenatis. Fusce pulvinar nunc ac placerat feugiat.',
    price: 45,
    quantity: 190,
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
    let products: any;
  for (let i = 0; i < productMock.length; i += 1) {
    if (productMock[i].id === id) products = productMock[i];
  }
  product = products;
  return product;
}
