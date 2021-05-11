// https://b4bheanrza.execute-api.eu-central-1.amazonaws.com/dev/products/%7Bid%7D
import product from '../../../types/product'
import { getLambdaResult } from '../../api/lib/lambda'
import ProductDetail from '../../../components/ProductDetail'
import Layout from '../../../components/Layout'
import { GetServerSideProps } from 'next'

export default function productDetailPage(prop: { product: product }) {
    console.log('PPP layout')
    console.log(prop.product)
    return (
        <Layout title={prop.product.name}>
            <ProductDetail product={prop.product} />
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const product: product = (await getLambdaResult(`products/${context.params?.id}`)).data
    return {
        props: {
            product
        } // will be passed to the page component as props
    }
}
