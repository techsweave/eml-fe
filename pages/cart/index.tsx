import Layout from '../../components/Layout'
import CartList from '../../components/CartList'
import product from '../../types/product'
import cart from '../../types/cart'

const alltheprods: product[] = [{ id: 1, name: 'cucchiaio', description: 'resistente cucchiaio in acciaio', price: 10, quantity: 20 },
  { id: 2, name: 'siringa', description: 'ottima siringa', price: 1, quantity: 2 },
  { id: 3, name: 'accendino', description: 'potente accendino', price: 2000, quantity: 1 }]

const carteg: cart = { ID: 100, total: 1000, products: alltheprods }

const cartPage = () => {
  return (
        <Layout title="Cart">
            <CartList cart={carteg}/>
        </Layout>
  )
}

export default cartPage
