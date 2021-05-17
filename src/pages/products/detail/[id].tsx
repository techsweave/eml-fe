import Product from '@models/product'
import ProductDetail from '@components/ProductDetail'
import Layout from '@components/Layout'
import { GetServerSideProps, GetStaticProps, GetStaticPaths } from 'next'
import { lambdaCaller } from '@libs/lambdaCaller'

export default function productDetailPage(prop: { product: Product }) {
    return (
        <Layout title={prop.product.name}>
            <ProductDetail product={prop.product} />
        </Layout>
    )
}
export const getStaticPaths: GetStaticPaths = async () => {
    //TODO: Implement this in a TRY/CATCH block, getStaticPaths doesn't support alert 
    let caller = new lambdaCaller();

    let id = (await caller.scanProductAsync(25)).data;
    let paths = id.map((idPath) => ({ params: { id: idPath.id } }))
    return {
        paths,
        fallback: false
    }

}

export const getStaticProps: GetStaticProps = async (context) => {
    let product;
    let caller = new lambdaCaller();

    try {
        product = await caller.getProductAsync(context.params?.id as string)
    }
    catch (error) {
        //TODO: Implement error handling here
        alert(error)

    }
    return {
        props: {
            product
        } // will be passed to the page component as props
    }
}
