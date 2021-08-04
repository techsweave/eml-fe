/* eslint-disable no-param-reassign */
import { getSession } from 'next-auth/client';
import Cookies from 'cookies';
import { Services, Models } from 'utilities-techsweave';
import { ConditionExpression } from '@aws/dynamodb-expressions';
import { NextApiRequest, NextApiResponse } from 'next';

type ICart = Models.Tables.ICart;
type IProduct = Models.Tables.IProduct;
type ICategory = Models.Tables.ICategory;
type ICartItemDetail = ICart & Omit<IProduct, 'id'> & Omit<ICategory, 'id'>;

const getUserCart = async (
  cookiesCart: ICart[],
  cartService: Services.Carts,
  cookie: any,
  fetchedCart: ICart[],
  ids: string[],
  changedProduct: number,
) => {
  const addCookiesCartPromise: Array<Promise<ICart>> = [];
  cookiesCart.forEach((x) => {
    addCookiesCartPromise.push(
      cartService.addProductAsync(x.productId, x.quantity),
    );
  });
  await Promise.all(addCookiesCartPromise);
  cookie.set('cart');
  cookiesCart = [];

  const fetch = await cartService.getAsync();
  fetchedCart = await fetchedCart.concat(fetch.data ? fetch.data : fetch as any);

  fetchedCart.forEach((x) => {
    if (!x.isChanged) {
      ids.push(x.productId);
    } else {
      changedProduct += 1;
    }
  });
  return { cookiesCart, fetchedCart, changedProduct };
};

const getProductsInCart = async (
  scanResult: Models.IMultipleDataBody<Models.Tables.IProduct>,
  productService: Services.Products,
  filter,
  fetchedProducts: Models.Tables.IProduct[],
) => {
  do {
    scanResult = await productService.scanAsync(
      50,
      scanResult?.lastEvaluatedKey?.id,
      undefined,
      undefined,
      filter,
    );
    fetchedProducts = fetchedProducts.concat(scanResult.count
      ? scanResult.data : scanResult as any);
  } while (scanResult?.lastEvaluatedKey);

  return { scanResult, fetchedProducts };
};

const getCategoriesInProducts = async (
  categoryArray: string[],
  categoryService: Services.Categories,
  fetchedProducts: Models.Tables.IProduct[],
  fetchedCategory: Models.Tables.ICategory[],
) => {
  const filter: ConditionExpression = {
    type: 'Membership',
    subject: 'id',
    values: categoryArray,
  };

  const categoryRet = await categoryService.scanAsync(
    fetchedProducts.length + 1,
    undefined,
    undefined,
    undefined,
    filter,
  );

  fetchedCategory = fetchedCategory.concat(
    categoryRet.count
      ? categoryRet.data
      : categoryRet as any,
  );
  return fetchedCategory;
};

const getCart = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  const cookie = new Cookies(req, res);
  let changedProduct = 0;

  let fetchedCart: Array<ICart> = [];
  let fetchedProducts: Array<IProduct> = [];
  let fetchedCategory: Array<ICategory> = [];
  let scanResult: Models.IMultipleDataBody<IProduct> = {
    data: [],
    count: 0,
  };
  const ids: Array<string> = [];
  const newState: Array<ICartItemDetail> = [];

  const cartService = new Services.Carts(
    process.env.NEXT_PUBLIC_API_ID_CART!,
    process.env.NEXT_PUBLIC_API_REGION!,
    process.env.NEXT_PUBLIC_API_STAGE!,
    session?.accessToken as string,
    session?.idToken as string,
  );
  const productService = new Services.Products(
    process.env.NEXT_PUBLIC_API_ID_PRODUCTS!,
    process.env.NEXT_PUBLIC_API_REGION!,
    process.env.NEXT_PUBLIC_API_STAGE!,
    session?.accessToken as string,
    session?.idToken as string,
  );
  const categoryService = new Services.Categories(
    productService,
    process.env.NEXT_PUBLIC_API_ID_CATEGORIES!,
    process.env.NEXT_PUBLIC_API_REGION!,
    process.env.NEXT_PUBLIC_API_STAGE!,
    session?.accessToken as string,
    session?.idToken as string,
  );

  let cookiesCart: Array<ICart> = cookie.get('cart') ? JSON.parse(cookie.get('cart')) : [];

  if (session) {
    ({ cookiesCart, fetchedCart, changedProduct } = await getUserCart(
      cookiesCart,
      cartService,
      cookie,
      fetchedCart,
      ids,
      changedProduct,
    ));
  }
  if (cookiesCart.length > 0) {
    fetchedCart = fetchedCart.concat(cookiesCart);
    cookiesCart.forEach((x) => {
      ids.push(x.productId);
    });
  }

  const filter: ConditionExpression = {
    type: 'Membership',
    subject: 'id',
    values: ids,
  };

  if (ids.length === 0) {
    return Promise.resolve({
      cart: [],
      changedProduct: 0,
    });
  }

  ({ scanResult, fetchedProducts } = await getProductsInCart(
    scanResult,
    productService,
    filter,
    fetchedProducts,
  ));

  const categoryArray: string[] = [];
  fetchedProducts.forEach((x) => (categoryArray.push(x.categorieId!)));

  fetchedCategory = await getCategoriesInProducts(
    categoryArray,
    categoryService,
    fetchedProducts,
    fetchedCategory,
  );

  fetchedProducts.forEach((x) => {
    const prod: Omit<IProduct, 'id'> & { id?: string } = x;
    const cart: ICart = { ...fetchedCart.find((y) => y.productId === x.id)! };
    const category: Omit<ICategory, 'id'> & { id?: string } = { ...fetchedCategory.find((y) => y.id === x.categorieId)! };

    delete prod.id;
    delete category.id;

    newState.push({
      ...cart,
      ...prod,
      ...category,
    });
  });

  return Promise.resolve({
    cart: newState,
    changedProduct,
  });
};

export default getCart;
