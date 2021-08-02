import Layout from '@components/Layout';
import ProductList from '@components/product/ProductList';
import { Models, Services } from 'utilities-techsweave';
import React, { useEffect, useState } from 'react';
import { Flex, Stack } from '@chakra-ui/layout';
import Filter from '@components/filter/Filter';
import { useRouter } from 'next/router';
import {
  ConditionExpression,
} from '@aws/dynamodb-expressions';
import { CircularProgress, useToast } from '@chakra-ui/react';
import { useSession } from 'next-auth/client';
import { GetStaticProps } from 'next';
import * as AWS from 'aws-sdk';

export default function productPage(prop) {
  AWS.config.update({
    region: 'eu-central-1',
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY as string,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS as string,
    },
  });
  const { products } = prop;
  const toast = useToast();
  const session = useSession()[0];
  const [state, setState] = useState<Models.Tables.IProduct[]>(products);
  const [isLoading, setLoading] = useState<boolean>(true);

  const router = useRouter();
  let minPrice: number;
  let maxPrice: number;
  let search = '';
  let minFilter: ConditionExpression;
  let maxFilter: ConditionExpression;
  let searchFilter: Models.CustomConditionExpression;

  async function scanProducts(s) {
    if (router.query.filterMin) {
      minPrice = +router.query.filterMin;
      minFilter = {
        type: 'GreaterThanOrEqualTo',
        subject: 'price',
        object: minPrice,
      };
    }
    if (router.query.filterMax) {
      maxPrice = +router.query.filterMax;
      maxFilter = {
        type: 'LessThanOrEqualTo',
        subject: 'price',
        object: maxPrice,
      };
    }
    if (router.query.search) {
      search = router.query.search.toString();
      searchFilter = {
        type: 'Contains',
        subject: 'title',
        object: search,
      };
    }
    const caller = new Services.Products(
      process.env.NEXT_PUBLIC_API_ID_PRODUCTS as string,
      process.env.NEXT_PUBLIC_API_REGION as string,
      process.env.NEXT_PUBLIC_API_STAGE as string,
      s?.accessToken as string,
      s?.idToken as string,
    );

    let filter: Models.CustomConditionExpression | undefined;
    if (search !== '') {
      filter = searchFilter;
    } else if (minFilter && maxFilter) {
      filter = {
        type: 'And',
        conditions: [
          minFilter,
          maxFilter,
        ],
      };
    } else if (minFilter && !maxFilter) {
      filter = minFilter;
    } else if (!minFilter && maxFilter) {
      filter = maxFilter;
    }
    let fetchedProducts: Array<Models.Tables.IProduct> = [];
    const scanResult = await caller.scanAsync(25, undefined, undefined,
      undefined, minFilter || maxFilter || searchFilter ? filter! : undefined);
    fetchedProducts = fetchedProducts.concat(
      scanResult.count ? scanResult.data : scanResult as any,
    );
    if (scanResult.data && scanResult.data.length === 0) {
      return [];
    }
    return fetchedProducts;
  }

  useEffect(() => {
    const s = session;
    if (s === undefined) return;
    if (!isLoading) return;
    scanProducts(s).then(
      (data) => {
        setState(data);
        setLoading(false);
      },
    ).catch(
      (err) => {
        toast({
          title: err.error.name,
          description: err.error.message,
          status: 'error',
          duration: 10000,
          isClosable: true,
          position: 'top-right',
        });
      },
    );
  }, [state, setState, isLoading, setLoading, session]);
  if (!isLoading) {
    return (
      <Layout title="Product-page" search={router.query.search?.toString()}>
        <Stack w='95%'>
          <Filter minProp={router.query.filterMin ? router.query.filterMin as string : ''} maxProp={router.query.filterMax ? router.query.filterMax as string : ''} />
          <ProductList productList={state} />
        </Stack>
      </Layout>
    );
  }
  return (
    <Layout title="Product-page" search={router.query.search?.toString()}>
      <Flex justifyContent='center'>
        <Stack w='95%'>
          <CircularProgress
            isIndeterminate
            color='red.300'
            size='3em'
          />
          <ProductList productList={products} />
        </Stack>
      </Flex>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  let products: Models.Tables.IProduct[] = [];
  let scanResult: Models.IMultipleDataBody<Models.Tables.IProduct> = {
    data: [],
    count: 0,
  };
  const caller = new Services.Products(
    process.env.NEXT_PUBLIC_API_ID_PRODUCTS as string,
    process.env.NEXT_PUBLIC_API_REGION as string,
    process.env.NEXT_PUBLIC_API_STAGE as string,
  );
  try {
    do {
      scanResult = await caller.scanAsync(50, scanResult?.lastEvaluatedKey?.id);
      products = products.concat(scanResult.count ? scanResult.data : scanResult as any);
    } while (scanResult?.lastEvaluatedKey);
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      products,
    },
  };
};
