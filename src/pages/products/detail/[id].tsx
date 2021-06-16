import { Models } from 'utilities-techsweave';
import ProductDetail from '@components/product/detail/ProductDetail';
import Layout from '@components/Layout';
import { GetStaticProps, GetStaticPaths } from 'next';
// import LambdaCaller from '@libs/lambdaCaller';
import React from 'react';
import { getProductById, getProductsData } from '@test/ProductMock';

export default function productDetailPage(prop: { product:Models.Tables.IProduct }) {
  return (
    <Layout title={prop.product.title}>
      <ProductDetail product={prop.product} />
    </Layout>
  );
}
export const getStaticPaths: GetStaticPaths = async () => {
  // const caller = new LambdaCaller();
  const paths = getProductById();
  /*  const id = (await caller.scanProductAsync(25)).data;
    paths = id.map((idPath) => ({ params: { id: idPath.id } })); */
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  let product: Models.Tables.IProduct;
  // const caller = new LambdaCaller();
  // product = await caller.getProductAsync(context.params?.id as string);
  product = await getProductsData(context.params?.id as string);
  return {
    props: {
      product,
    }, // will be passed to the page component as props
    revalidate: 600,
  };
};
