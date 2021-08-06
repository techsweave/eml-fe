import { buffer } from 'micro';
import Cors from 'micro-cors';
import { NextApiRequest, NextApiResponse } from 'next';
import { Services } from 'utilities-techsweave';
import { ConditionExpression } from '@aws/dynamodb-expressions';

import Stripe from 'stripe';
import { IOrder } from 'utilities-techsweave/dist/src/api/models/database';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2020-08-27',
});

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!;

// Stripe requires the raw body to construct the event, so we have to diable the next parser
export const config = {
  api: {
    bodyParser: false,
  },
};

const cors = Cors({
  allowMethods: ['POST', 'HEAD'],
});

/**
 * Webhook which listen for stripe events
 * @param req Http Request
 * @param res Http Response
 * @returns Void
 */
const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature']!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(buf.toString(), sig, webhookSecret);
    } catch (err) {
      // On error, log and return the error message.
      res.status(400).send(`Webhook Error 1: ${err.message} \n Request: ${req} \n Result: ${res} \n Signature: ${sig} Secret: ${webhookSecret}`); // TODO: TOGLIERE SECRET DOPO IL DEBUG SU VERCEL!!!!
      return;
    }

    // Cast event data to Stripe object.
    // if (event.type === 'payment_intent.succeeded') {
    //   const paymentIntent = event.data.object as Stripe.PaymentIntent;
    //   console.log('payment_intent.succeeded');
    //   console.log(paymentIntent);
    // } else if (event.type === 'payment_intent.payment_failed') {
    //   const paymentIntent = event.data.object as Stripe.PaymentIntent;
    // } else if (event.type === 'charge.succeeded') {
    //   const charge = event.data.object as Stripe.Charge;
    // } else
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const ordersService = new Services.Orders(
        process.env.NEXT_PUBLIC_API_ID_ORDERS!,
        process.env.NEXT_PUBLIC_API_REGION!,
        process.env.NEXT_PUBLIC_API_STAGE!,
        (session.metadata!.accessToken_1 as string)
          .concat(session.metadata!.accessToken_2)
          .concat(session.metadata!.accessToken_3),
        (session.metadata!.idToken_1 as string)
          .concat(session.metadata!.idToken_2)
          .concat(session.metadata!.idToken_3),
      );

      const filter: ConditionExpression = {
        type: 'Equals',
        subject: 'status',
        object: 'IN PROGRESS',
      };

      let orderId = '';

      try {
        const result = await ordersService.scanAsync(
          1,
          undefined,
          undefined,
          undefined,
          filter,
        ) as unknown;
        orderId = (result as IOrder).id;
      } catch (err) {
        res.status(400).send(`Webhook Error 2: ${err.message} Request: ${req} \n Result: ${res} \n Signature: ${sig} Secret: ${webhookSecret} \n Event: ${event}`);
        return;
      }

      try {
        if (session.payment_status === 'paid') {
          await ordersService.markAsCompletedAsync(orderId, false);
        } else {
          await ordersService.markAsCompletedAsync(orderId, true);
        }
      } catch (err) {
        console.warn(`Error: ${err}`);
        res.status(400).send(`Webhook Error 3: ${JSON.stringify(err)} Request: ${req} \n Result: ${res} \n Signature: ${sig} Secret: ${webhookSecret} \n Event: ${event} \n Order: ${orderId}`);
        return;
      }
    }
    // else {
    //   console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
    // }

    // Return a response to acknowledge receipt of the event.
    res.status(200).json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};

export default cors(webhookHandler as any);
