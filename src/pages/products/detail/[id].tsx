import { Models, Services } from 'utilities-techsweave';
import ProductDetail from '@components/product/detail/ProductDetail';
import Layout from '@components/Layout';
import { GetStaticProps, GetStaticPaths } from 'next';
import RelatedProduct from '@components/product/detail/RelatedProduct/RelatedArticles';
import React from 'react';
import { ConditionExpression } from '@aws/dynamodb-expressions';
import { Flex } from '@chakra-ui/react';

export default function productDetailPage(prop) {
  const { product, relatedProducts } = prop;
  return (
    <Layout title={product.title}>
      <Flex flexDirection='column' alignSelf="center">
        <ProductDetail product={product} />
        <RelatedProduct product={relatedProducts} />
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
  const category = product.categorieId;
  const productId = product.id;
  const filter: ConditionExpression = {
    type: 'And',
    conditions: [
      {
        type: 'Equals',
        subject: 'categorieId',
        object: category,
      },
      {
        type: 'NotEquals',
        subject: 'id',
        object: productId,
      },
    ],
  };
  let relatedProducts;
  try {
    relatedProducts = await caller.scanAsync(6, undefined, undefined, undefined, filter);
    if (relatedProducts.data) {
      relatedProducts = relatedProducts.data;
    } else {
      relatedProducts = [relatedProducts];
    }
  } catch (error) {
    console.log(error);
  }
  console.log(relatedProducts);
  return {
    props: {
      product,
      relatedProducts,
    }, // will be passed to the page component as props
    revalidate: 600,
  };
};
