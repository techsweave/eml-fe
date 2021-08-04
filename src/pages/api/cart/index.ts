import Cors from 'micro-cors';
import { NextApiRequest, NextApiResponse } from 'next';
import getCart from './actions/list';
import addProductToCart from './actions/addProductToCart';

const cors = Cors({
  allowMethods: ['GET', 'OPTIONS', 'HEAD'],
});

/**
 * API
 * @param req Http Request
 * @param res Http Response
 * @returns Void
 */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    res.status(200).json(
      await getCart(req, res),
    );
    return;
  }

  if (req.method === 'POST') {
    const { productsIds, quantity } = req.body;
    res.status(201).json(
      await addProductToCart(req, res, productsIds, quantity),
    );
    return;
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end('Method Not Allowed');
};

export default cors(handler as any);
