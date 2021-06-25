import { Models, Services } from 'utilities-techsweave';
import ProductDetail from '@components/product/detail/ProductDetail';
import Layout from '@components/Layout';
import { GetStaticProps, GetStaticPaths } from 'next';
import RelatedProduct from '@components/product/detail/RelatedProduct/RelatedArticles';
import React from 'react';
import { ConditionExpression } from '@aws/dynamodb-expressions';
import { Flex } from '@chakra-ui/react';
import productMock from '@test/ProductMock';

export default function productDetailPage(prop) {
  const { product } = prop;
  return (
    <Layout title={product.title}>
      <Flex flexDirection='column' alignSelf="center">
        <ProductDetail product={product} />
        <RelatedProduct product={productMock} />
      </Flex>
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
  let product;
  const caller = new Services.Products(`${process.env.NEXT_PUBLIC_API_ID_PRODUCTS}`, `${process.env.NEXT_PUBLIC_API_REGION}`, `${process.env.NEXT_PUBLIC_API_STAGE}`);
  try {
    product = await caller.getAsync(context.params?.id as string);
  } catch (error) {
    alert(error);
  }
  return {
    props: {
      product,
    }, // will be passed to the page component as props
    revalidate: 600,
  };
};
