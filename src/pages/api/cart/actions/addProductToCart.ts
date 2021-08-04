import { getSession } from 'next-auth/client';
import Cookies from 'cookies';
import { Services, Models } from 'utilities-techsweave';
import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';

type INewCart = Models.Tables.INewCart;
type ICart = Models.Tables.ICart;

const addSingleProductToCookieCart = async (
  cookie: any,
  productId: string,
  quantity: number,
): Promise<INewCart> => {
  const currentCart: Array<INewCart> = cookie.get('cart') ? cookie.get('cart') : [];
  const newCart: INewCart = {
    productId,
    quantity,
    isChanged: false,
    userId: 'localUser',
  };

  currentCart.push(newCart);
  cookie.set('cart', newCart);

  return Promise.resolve(newCart);
};

const addMultipleProductToCookieCart = async (
  cookie: any,
  productsIds: Array<string>,
): Promise<Array<INewCart>> => {
  const addPromises: Array<Promise<INewCart>> = [];
  productsIds.forEach((x) => {
    addPromises.push(
      addSingleProductToCookieCart(
        cookie,
        x,
        1,
      ),
    );
  });
  return Promise.all(addPromises);
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
