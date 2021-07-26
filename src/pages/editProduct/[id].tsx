import React from 'react';
import Layout from '@components/Layout';
import EditProduct from '@components/product/vendor/EditProduct';
import { GetStaticProps, GetStaticPaths } from 'next';
import { Services, Models } from 'utilities-techsweave';

export default function editProduct(prop:{ product : Models.Tables.IProduct }) {
  const { product } = prop;
  return (
    <Layout title="Edit-product">
      <EditProduct product={product} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  let product;
  const caller = new Services.Products(`${process.env.NEXT_PUBLIC_API_ID_PRODUCTS}`, `${process.env.NEXT_PUBLIC_API_REGION}`, `${process.env.NEXT_PUBLIC_API_STAGE}`);
  try {
    product = await caller.getAsync(context.params?.id as string);
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      product,
    }, // will be passed to the page component as props
    revalidate: 600,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const caller = new Services.Products(`${process.env.NEXT_PUBLIC_API_ID_PRODUCTS}`, `${process.env.NEXT_PUBLIC_API_REGION}`, `${process.env.NEXT_PUBLIC_API_STAGE}`);
  const id = (await caller.scanAsync(25)).data;
  const paths = id.map((idPath) => ({ params: { id: idPath.id } }));
  return {
    paths,
    fallback: false,
  };
};
