import Layout from '@components/Layout'
import { loadStripe } from '@stripe/stripe-js'
import { GetServerSideProps } from 'next'
import { useSession, getSession } from 'next-auth/client'
import { lambdaCaller } from '@libs/lambdaCaller'
import { ConditionExpression } from "@aws/dynamodb-expressions"
import CartItem from '@models/cart'
import Product from '@models/product'


// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function Cart({ record }) {
    const [session, loading] = useSession()

    const handleClick = async (event) => {

        // Get Stripe.js instance
        const stripe = await stripePromise
        let caller = new lambdaCaller();

        try {
            const stripeSession = await caller.goToCheckOutAsync("https://eml-fe.vercel.app", "https://eml-fe.vercel.app/cart")
            console.log(stripeSession)

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
                                        <td>{element.product?.name}</td>
                                        <td>{element.product?.price}</td>
                                        <td>{element.product?.description}</td>
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
export const getServerSideProps: GetServerSideProps = async (context) => {

    let cart: CartItem[] = new Array();
    let products: Product[] = new Array();
    let caller = new lambdaCaller(await getSession(context));

    try {
        cart = (await caller.getCartAsync()).data
    }
    catch (error) {
        //TODO: Implement error handling here 
        alert(error)
    }

    const filterId: string[] = new Array()

    cart.forEach(x => filterId.push(x.productId))

    const filter: ConditionExpression = {
        type: 'Membership',
        subject: 'id',
        values: filterId
    }

    try {
        products = (await caller.scanProductAsync(25, undefined, undefined, undefined, filter)).data
        cart.forEach(x => x.product = products.find(t => t.id == x.productId))
        cart = cart.filter(x => x.product)
    }
    catch (error) {
        //TODO: Implement error handling here
        alert(error)
    }

    return {
        props: {
            record: cart
        }
    }
}
