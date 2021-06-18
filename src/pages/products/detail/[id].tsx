import { Models, Services } from 'utilities-techsweave';
import ProductDetail from '@components/product/detail/ProductDetail';
import Layout from '@components/Layout';
import { GetStaticProps, GetStaticPaths } from 'next';
import React from 'react';

export default function productDetailPage(prop: { product:Models.Tables.IProduct }) {
  return (
    <Layout title={prop.product.title}>
      <ProductDetail product={prop.product} />
    </Layout>
  );
}
export const getStaticPaths: GetStaticPaths = async () => {
  const caller = new Services.Products(`${process.env.NEXT_PUBLIC_API_ID_PRODUCTS}`, `${process.env.NEXT_PUBLIC_API_REGION}`, `${process.env.NEXT_PUBLIC_API_STAGE}`);
  const id = (await caller.scanAsync(25)).data;
  const paths = id.map((idPath) => ({ params: { id: idPath.id } }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const caller = new Services.Products(`${process.env.NEXT_PUBLIC_API_ID_PRODUCTS}`, `${process.env.NEXT_PUBLIC_API_REGION}`, `${process.env.NEXT_PUBLIC_API_STAGE}`);
  const product = await caller.getAsync(context.params?.id as string);
  return {
    props: {
      product,
    }, // will be passed to the page component as props
    revalidate: 600,
  };
};
