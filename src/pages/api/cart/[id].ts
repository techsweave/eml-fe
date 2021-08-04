import Cors from 'micro-cors';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import Cookies from 'cookies';

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
  const session = getSession({ req });
  const cookie = new Cookies(req, res);

  const { id } = req.query;

  if (req.method === 'GET') {
    res.status(200).json({ received: true });
  } else {
    res.setHeader('Allow', 'GET');
    res.status(405).end('Method Not Allowed');
  }
};

export default cors(handler as any);
