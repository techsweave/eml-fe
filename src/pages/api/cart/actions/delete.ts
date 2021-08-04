import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';
import { Models, Services } from 'utilities-techsweave';
import { getSession } from 'next-auth/client';
import Cookies from 'cookies';

type ICart = Models.Tables.ICart;

const deleteCartToService = (
  session: Session,
  cartId: string,
): Promise<ICart> => {
  const cartService = new Services.Carts(
    process.env.NEXT_PUBLIC_API_ID_CART!,
    process.env.NEXT_PUBLIC_API_REGION!,
    process.env.NEXT_PUBLIC_API_STAGE!,
    session?.accessToken as string,
    session?.idToken as string,
  );

  return cartService.removeProductAsync(cartId);
};

const deleteCartToCookies = (
  cookie: any,
  cartId: string,
): Promise<ICart | undefined> => {
  const currentCart: Array<ICart> = cookie.get('cart') ? JSON.parse(cookie.get('cart')) : [];
  const item = currentCart.find((x) => x.id === cartId);
  const index = currentCart.findIndex((x) => x.id === cartId);
  if (index >= 0) {
    currentCart.splice(index, 1);
  }
  cookie.set('cart', JSON.stringify(currentCart));
  return Promise.resolve(item);
};

const deleteCart = async (
  req: NextApiRequest,
  res: NextApiResponse,
  cartId: string,
) => {
  const session = await getSession({ req });
  const cookie = new Cookies(req, res);

  if (!session) {
    return deleteCartToCookies(cookie, cartId);
  }

  return deleteCartToService(session, cartId);
};

export { deleteCartToCookies };
export default deleteCart;
