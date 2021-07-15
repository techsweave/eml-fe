import { Models } from 'utilities-techsweave';

const productMock: Models.Tables.IProduct[] = [
  {
    id: '43r2343344',
    SKU: 'dnoiasdo78',
    title: 'book A. Touring',
    description: 'Really good book good, with a really good story in a really bad time',
    price: 14.5,
    imageURL: '/images/test/aTouring.jpg',
    availabilityQta: 10,
  },
  {
    id: '498324nr98hriu8',
    SKU: 'fsdpf09',
    title: 'Oneplus 8T',
    description: 'Amazing android phone',
    price: 599,
    imageURL: '/images/test/op8T.jpg',
    availabilityQta: 76,
  },
  {
    id: 'kno980u8970',
    SKU: 'fsdfs09',
    title: 'snow sledding',
    description: 'fantastic snow sledding - for winter use only',
    price: 78,
    imageURL: '/images/test/slittino.PNG',
    availabilityQta: 4,
  },
  {
    id: 'rrewr4656346wb33',
    SKU: 'fsdmfkolsd089',
    title: 'Bigoli - tipical venetian pasta',
    description: 'fantastic venetian pasta, eat it with carbonara or ragù',
    price: 3.5,
    imageURL: '/images/test/Bigoli.jpg',
    availabilityQta: 1900,
  },
  {
    id: 'fdsdfdsfsdf',
    SKU: 'fsdfnlksd9ui',
    title: 'cafe',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dignissim est in ligula porta, ac pretium lacus aliquam. Vivamus a laoreet ante. Quisque congue ultrices mauris eu viverra. Suspendisse sed dui turpis. Donec non condimentum odio. Donec elementum, sapien at facilisis suscipit, purus lorem vestibulum lectus, vitae finibus ligula felis nec lacus. Nullam ut tellus sodales, sagittis urna nec, molestie nunc. Curabitur pulvinar hendrerit turpis sed vestibulum. Donec molestie lorem luctus finibus rhoncus. Etiam faucibus mauris sed convallis egestas. Sed diam est, tristique vel justo vel, elementum semper augue. Phasellus aliquam pretium tellus, id laoreet dui tincidunt et. Morbi pharetra semper odio id dictum. Proin porta mauris at elementum venenatis. Fusce pulvinar nunc ac placerat feugiat.',
    price: 45,
    imageURL: '/images/test/Bigoli.jpg',
    availabilityQta: 190,
  },
  {
    id: 'asdqwdwqdqwfqwf',
    SKU: 'fsdpfddwww321q09',
    title: 'Lenovo ThinkPad L14 GEN1',
    description: 'A fantstic portable pc to work and game with cool style',
    price: 999,
    imageURL: '/images/test/thinkpad.webp',
    availabilityQta: 76,
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

export function getProductsData(id: string) {
  let product: Models.Tables.IProduct;
  let products: any;
  for (let i = 0; i < productMock.length; i += 1) {
    if (productMock[i].id === id) products = productMock[i];
  }
  product = products;
  return product;
}

export async function getProductsArrayData(id: string[]) {
  let product: Models.Tables.IProduct[];
  const products: any[] = [];
  for (let j = 0; j < id.length; j += 1) {
    for (let i = 0; i < productMock.length; i += 1) {
      if (productMock[i].id === id[j]) {
        products.push(productMock[i]);
      }
    }
  }
  product = products;
  return product;
}
