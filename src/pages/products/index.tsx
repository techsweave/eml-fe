import Layout from '@components/Layout'
import ProductList from '@components/ProductList'
import { GetServerSideProps, GetStaticProps } from 'next'
import { lambdaCaller } from '@libs/lambdaCaller'
import Product from '@models/product'


export default function productPage({ record }) {
    return (
        <Layout title="Product-page">
            {<ProductList productlist={record} />}
        </Layout>
    )
}
export const getStaticProps: GetStaticProps = async () => {
    let products: Product[] = new Array();
    let caller = new lambdaCaller();
    try {
        products = (await caller.scanProductAsync(25)).data
    } catch (error) {
        //TODO: Implements error handling here
        alert(error)
    }
    return {
        props: {
            record: products
        } // will be passed to the page component as props
    }
}
