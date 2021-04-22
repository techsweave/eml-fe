import Layout from '../../components/Layout'
import CartList from '../../components/CartList'
import product from '../../types/product'
import cart from '../../types/cart'
import { loadStripe } from '@stripe/stripe-js'

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const alltheprods: product[] = [{ id: 1, name: 'Product sample 1', description: 'Description of Product 1', price: 10, quantity: 20 },
{ id: 2, name: 'Product sample 2', description: 'Description of Product 2', price: 1, quantity: 2 },
{ id: 3, name: 'Product sample 3', description: 'Description of Product 3', price: 2000, quantity: 1 }]

const carteg: cart = { ID: 100, total: 1000, products: alltheprods }

export default function Cart() {
  const handleClick = async (event) => {
    // Get Stripe.js instance
    const stripe = await stripePromise
    // Call your backend to create the Checkout Session
    const { sessionId } = await fetch('/api/checkout/session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ quantity: 1 })
    }).then(res => res.json())

    // When the customer clicks on the button, redirect them to Checkout.
    const { error } = await stripe.redirectToCheckout({
      sessionId
    })
  }
  return (
    <Layout title="Cart page">
      <CartList cart={carteg} />
      <br />
      <button className="goToCheckout" onClick={handleClick}>Checkout</button>
    </Layout>
  )
}
