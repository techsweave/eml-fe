import Layout from '../../components/Layout'
import ProductList from '../../components/ProductList'
import { getLambdaResult } from '../api/lib/lambda'
import { GetServerSideProps } from 'next'
import { lambdaCaller } from '../api/lib/lambdaCaller'

export default function productPage({ record }) {
    return (
        <Layout title="Product-page">
            {<ProductList productlist={record} />}
        </Layout>
    )
}
export const getServerSideProps: GetServerSideProps = async () => {
    return {
        props: {
            record: await lambdaCaller.scanProductAsync(25)
        } // will be passed to the page component as props
    }
}
