import { getSession } from 'next-auth/client';
import Cookies from 'cookies';
import { Services, Models } from 'utilities-techsweave';
import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';
import { v4 as uuidv4 } from 'uuid';

type ICart = Models.Tables.ICart;

const addSingleProductToCookieCart = async (
  cookie: any,
  productId: string,
  quantity: number,
): Promise<ICart> => {
  const currentCart: Array<ICart> = cookie.get('cart') ? JSON.parse(cookie.get('cart')) : [];
  const newCart: ICart = {
    id: uuidv4(), // fake id
    productId,
    quantity,
    isChanged: false,
    userId: 'localUser',
  };

  currentCart.push(newCart);
  cookie.set('cart', JSON.stringify(currentCart), {
    expires: new Date(Date.now() + (1000 * 3600 * 24 * 7 * 31 * 12)),
  });

  return Promise.resolve(newCart);
};

const addMultipleProductToCookieCart = async (
  cookie: any,
  productsIds: Array<string>,
): Promise<Array<ICart>> => {
  const currentCart: Array<ICart> = cookie.get('cart') ? JSON.parse(cookie.get('cart')) : [];
  productsIds.forEach((x) => {
    const newCart: ICart = {
      id: uuidv4(), // fake id
      productId: x,
      quantity: 1,
      isChanged: false,
      userId: 'localUser',
    };
    currentCart.push(newCart);
  });

  cookie.set('cart', JSON.stringify(currentCart), {
    expires: new Date(Date.now() + (1000 * 3600 * 24 * 7 * 31 * 12)),
  });

  return Promise.resolve(currentCart);
};

const addSingleProductToServiceCart = async (
  session: Session,
  productId: string,
  quantity: number,
): Promise<ICart> => {
  const cartService = new Services.Carts(
    process.env.NEXT_PUBLIC_API_ID_CART!,
    process.env.NEXT_PUBLIC_API_REGION!,
    process.env.NEXT_PUBLIC_API_STAGE!,
    session?.accessToken as string,
    session?.idToken as string,
  );

  return cartService.addProductAsync(productId, quantity);
};

const addMultipleProductToServiceCart = async (
  session: Session,
  products: Array<string>,
): Promise<Array<ICart>> => {
  const addPromises: Array<Promise<ICart>> = [];
  products.forEach((x) => {
    addPromises.push(
      addSingleProductToServiceCart(
        session,
        x,
        1,
      ),
    );
  });
  return Promise.all(addPromises);
};

const addProductToCart = async (
  req: NextApiRequest,
  res: NextApiResponse,
  productsIds: Array<string> | string,
  quantity?: number,
) => {
  const session = await getSession({ req });
  const cookie = new Cookies(req, res);

  if (!session && quantity) {
    return addSingleProductToCookieCart(cookie, productsIds as string, quantity);
  }

  if (!session && !quantity) {
    return addMultipleProductToCookieCart(cookie, productsIds as Array<string>);
  }

  if (session && quantity) {
    return addSingleProductToServiceCart(session, productsIds as string, quantity);
  }

  return addMultipleProductToServiceCart(session!, productsIds as Array<string>);
};
export default addProductToCart;
