import Layout from '@components/Layout'
import { loadStripe } from '@stripe/stripe-js'
import { GetServerSideProps } from 'next'
import { useSession } from 'next-auth/client'
import { lambdaCaller } from '@libs/lambdaCaller'
import { ConditionExpression } from "@aws/dynamodb-expressions"
import Cart from '@models/cart'
import Product from '@models/product'


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

        try {
            const stripeSession = await lambdaCaller.goToCheckOutAsync("https://eml-fe.vercel.app", "https://eml-fe.vercel.app/cart")

            // When the customer clicks on the button, redirect them to Checkout.
            const result = await stripe?.redirectToCheckout({
                sessionId: stripeSession.id
            })
        }
        catch (error) {
            //TODO: Implement error handling here
            alert(error)
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

    let cartItems: Cart[] = new Array();
    let products: Product[] = new Array();

    try {
        cartItems = (await lambdaCaller.getCartAsync()).data
    }
    catch (error) {
        //TODO: Implement error handling here 
        alert(error)
    }

    const filterId: string[] = new Array()

    cartItems.forEach(x => filterId.push(x.productId))

    const filter: ConditionExpression = {
        type: 'Membership',
        subject: 'id',
        values: filterId
    }

    try {
        products = (await lambdaCaller.scanProductAsync(25, undefined, undefined, undefined, filter)).data
    }
    catch (error) {
        //TODO: Implement error handling here
        alert(error)
    }


    return {
        props: {
            record: products
        }
    }
}
