import Layout from '../../components/Layout'
import ProductList from '../../components/ProductList'
import { getLambdaResult } from '../api/lib/lambda'
import { GetServerSideProps } from 'next'

export default function productPage ({ record }) {
  return (
    <Layout title="Product-page">
      {<ProductList productlist={record} />}
    </Layout>
  )
}
export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      record: await (await getLambdaResult('products')).props.response.data
    } // will be passed to the page component as props
  }
}
