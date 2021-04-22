import Layout from '../../components/Layout'
import ProductList from '../../components/ProductList'
import product from '../../types/product'

const alltheprods: product[] = [{ id: 1, name: 'Product sample 1', description: 'Description of Product 1', price: 10, quantity: 20 },
  { id: 2, name: 'Product sample 2', description: 'Description of Product 2', price: 1, quantity: 2 },
  { id: 3, name: 'Product sample 3', description: 'Description of Product 3', price: 2000, quantity: 1 }]

export default function productPage () {
  return (
        <Layout title="Product-page">
            <ProductList productlist={alltheprods} />
        </Layout>
  )
}
