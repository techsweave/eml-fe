import Product from '@models/product';
import ProductDetail from '@components/product/detail/ProductDetail';
import Layout from '@components/Layout';
import { GetStaticProps, GetStaticPaths } from 'next';
import LambdaCaller from '@libs/lambdaCaller';
import React from 'react';

export default function productDetailPage(prop: { product: Product }) {
  return (
    <Layout title={prop.product.name}>
      <ProductDetail product={prop.product} />
    </Layout>
  );
}
export const getStaticPaths: GetStaticPaths = async () => {
  let paths;
  const caller = new LambdaCaller();
  try {
    const id = (await caller.scanProductAsync(25)).data;
    paths = id.map((idPath) => ({ params: { id: idPath.id } }));
  } catch (error) {
    // TODO: Implement error handling here
    alert(error);
  }
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  let product;
  const caller = new LambdaCaller();

  try {
    product = await caller.getProductAsync(context.params?.id as string);
  } catch (error) {
    // TODO: Implement error handling here
    alert(error);
  }
  return {
    props: {
      product,
    }, // will be passed to the page component as props
  };
};
