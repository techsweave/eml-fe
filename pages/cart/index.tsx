import Layout from '../../components/Layout'
import CartList from '../../components/CartList'
import product from '../../types/product'
import cart from '../../types/cart'
import { loadStripe } from '@stripe/stripe-js'
import { getLambdaResult } from '../api/lib/lambda'
import { GetServerSideProps } from 'next'
import { useSession } from 'next-auth/client'
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function Cart({ record }) {
    const [session, loading] = useSession()

    const handleClick = async (event) => {

        // Get Stripe.js instance
        const stripe = await stripePromise


        let headers: HeadersInit = new Headers()
        headers.set("Content-Type", "application/json")

        // Call your backend to create the Checkout Session
        const response = await fetch('https://b4bheanrza.execute-api.eu-central-1.amazonaws.com/dev/checkout', {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                successUrl: "https://eml-fe.vercel.app",
                cancelUrl: "https://eml-fe.vercel.app/cart"
            })
        })
        const stripeSession = await response.json()
        // When the customer clicks on the button, redirect them to Checkout.
        if (stripeSession.error) {
            alert(stripeSession.error)
        }
        else {
            const result = await stripe?.redirectToCheckout({
                sessionId: stripeSession.data.id
            })
        }

    }
    return (
        <Layout title="Cart page">
            {!session && (
                <span>User not authenticated, please sign-in to acces the cart</span>
            )
            }
            {session && (
                <div>
                    {
                        <table id="cartTable">
                            <caption> Cart sample </caption>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Description</th>
                                    <th>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {record.map((element) => (
                                    <tr>
                                        <td>{element.product.name}</td>
                                        <td>{element.product.price}</td>
                                        <td>{element.product.description}</td>
                                        <td>{element.quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    }
                    <br />
                    <button className="goToCheckout" onClick={handleClick}>Checkout</button>
                </div>
            )}
        </Layout>
    )
}
export const getServerSideProps: GetServerSideProps = async () => {
    const cartItems = (await getLambdaResult('cart')).data
    const productItems = new Array<any>()
    for await (const element of cartItems) {
        productItems.push({

            product: (await getLambdaResult(`products/${element.productId}`)).data,
            quantity: element.quantity
        })
    }
    return {
        props: {
            record: productItems

        }
    }
}
