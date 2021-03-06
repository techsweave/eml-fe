import Cors from 'micro-cors';
import { NextApiRequest, NextApiResponse } from 'next';
import addQuantity from './actions/addQuantity';
import deleteCart from './actions/delete';

const cors = Cors({
  allowMethods: ['PUT', 'DELETE', 'OPTIONS', 'HEAD'],
});

/**
 * API
 * @param req Http Request
 * @param res Http Response
 * @returns Void
 */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { quantity } = req.body;
    res.status(200).json(
      await addQuantity(req, res, id as string, quantity),
    );
    return;
  }

  if (req.method === 'DELETE') {
    res.status(200).json(
      await deleteCart(req, res, id as string),
    );
    return;
  }

  res.setHeader('Allow', ['PUT', 'DELETE']);
  res.status(405).end('Method Not Allowed');
};

export default cors(handler as any);
