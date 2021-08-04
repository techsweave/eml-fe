import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';
import { Models, Services } from 'utilities-techsweave';
import { getSession } from 'next-auth/client';
import Cookies from 'cookies';
import { deleteCartToCookies } from './delete';

type ICart = Models.Tables.ICart;

const addQuantityToService = (
  session: Session,
  cartId: string,
  quantity: number,
): Promise<ICart> => {
  const cartService = new Services.Carts(
    process.env.NEXT_PUBLIC_API_ID_CART!,
    process.env.NEXT_PUBLIC_API_REGION!,
    process.env.NEXT_PUBLIC_API_STAGE!,
    session?.accessToken as string,
    session?.idToken as string,
  );

  return cartService.changeQuantityAsync(cartId, quantity);
};

const addQuantityToCookies = (
  cookie: any,
  cartId: string,
  quantity: number,
): Promise<ICart | undefined> => {
  if (quantity <= 0) {
    return deleteCartToCookies(cookie, cartId);
  }
  const currentCart: Array<ICart> = cookie.get('cart') ? JSON.parse(cookie.get('cart')) : [];
  const item = currentCart.find((x) => x.id === cartId);
  if (item) {
    item.quantity = quantity;
  }
  cookie.set('cart', JSON.stringify(currentCart), {
    expires: new Date(Date.now() + (1000 * 3600 * 24 * 7 * 31 * 12)),
  });
  return Promise.resolve(item);
};

const addQuantity = async (
  req: NextApiRequest,
  res: NextApiResponse,
  cartId: string,
  quantity: number,
) => {
  const session = await getSession({ req });
  const cookie = new Cookies(req, res);

  if (!session) {
    return addQuantityToCookies(cookie, cartId, quantity);
  }

  return addQuantityToService(session, cartId, quantity);
};

export default addQuantity;
