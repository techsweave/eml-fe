import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2020-08-27' })

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { quantity } = req.body
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price: 'price_1Ij4BcF20K2KHUILT4B6IKEO',
                quantity
            },
            {
                price: 'price_1Ij4CsF20K2KHUILKulBqesI',
                quantity
            }
        ],
        mode: 'payment',
        success_url: `${req.headers.origin}/cart`,
        cancel_url: `${req.headers.origin}/cart`
    })
    res.status(200).json({ sessionId: session.id })
}
