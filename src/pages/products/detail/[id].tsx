import { Services, Models } from 'utilities-techsweave';
import ProductDetail from '@components/product/detail/ProductDetail';
import Layout from '@components/Layout';
import { GetStaticProps, GetStaticPaths } from 'next';
import React from 'react';
import { ConditionExpression } from '@aws/dynamodb-expressions';
import {
  Box, Flex, Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody, Button,
} from '@chakra-ui/react';
import ProductInfo from '@components/product/detail/ProductInfo';

export default function productDetailPage(prop) {
  const { product, alternativeProduct, ret } = prop;
  return (
    <Layout title={product.title}>
      <Flex flexDirection='column' alignSelf="center" w='100%'>
        <ProductDetail product={product} category={ret} alternativeProduct={alternativeProduct} />
        <Box display={['inherit', 'inherit', 'none', 'none']} alignSelf='center' mt='5'>
          <Popover>
            <PopoverTrigger>
              <Button>Product&apos;s details</Button>
            </PopoverTrigger>
            <PopoverContent mb='5'>
              <PopoverHeader textAlign='center' fontWeight='bold' fontSize='4xl'>Product&apos;s details</PopoverHeader>
              <PopoverBody><ProductInfo product={product} /></PopoverBody>
            </PopoverContent>
          </Popover>
        </Box>
      </Flex>
    </Layout>
  );
}
export const getStaticPaths: GetStaticPaths = async () => {
  const caller = new Services.Products(
    process.env.NEXT_PUBLIC_API_ID_PRODUCTS as string,
    process.env.NEXT_PUBLIC_API_REGION as string,
    process.env.NEXT_PUBLIC_API_STAGE as string,
  );
  const id = (await caller.scanAsync(25)).data;
  const paths = id.map((idPath) => ({ params: { id: idPath.id } }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  let product;
  let alternativeProduct: Models.Tables.IProduct[] = [];
  let ret;
  let scanResult: Models.IMultipleDataBody<Models.Tables.IProduct> = {
    data: [],
    count: 0,
  };
  const caller = new Services.Products(`${process.env.NEXT_PUBLIC_API_ID_PRODUCTS}`, `${process.env.NEXT_PUBLIC_API_REGION}`, `${process.env.NEXT_PUBLIC_API_STAGE}`);
  const categoriesCaller = new Services.Categories(caller, `${process.env.NEXT_PUBLIC_API_ID_CATEGORIES}`, `${process.env.NEXT_PUBLIC_API_REGION}`, `${process.env.NEXT_PUBLIC_API_STAGE}`);
  try {
    product = await caller.getAsync(context.params?.id as string);
    ret = await categoriesCaller.getAsync(product.categorieId);
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
    scanResult = await caller.scanAsync(6, undefined, undefined, undefined, filter);
    alternativeProduct = alternativeProduct.concat(
      scanResult.count ? scanResult.data : scanResult as any,
    );
    if (scanResult.data && scanResult.data.length === 0) {
      alternativeProduct = [];
    }
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      product,
      alternativeProduct,
      ret,
    }, // will be passed to the page component as props
    revalidate: 600,
  };
};
