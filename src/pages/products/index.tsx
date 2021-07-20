import Layout from '@components/Layout';
import ProductList from '@components/product/ProductList';
import { GetStaticProps } from 'next';
import { Models, Services } from 'utilities-techsweave';
import React, { useEffect, useState } from 'react';
import { Flex, Stack } from '@chakra-ui/layout';
import Filter from '@components/filter/Filter';
import { useRouter } from 'next/router'
import { ConditionExpression, ExpressionAttributes, FunctionExpression, AttributePath } from '@aws/dynamodb-expressions';
import { CircularProgress } from '@chakra-ui/react';

export default function productPage({ record }) {

  const [state, setState] = useState<Models.Tables.IProduct[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  const router = useRouter();
  let minPrice: number;
  let maxPrice: number;
  let search: string = '';
  let minFilter: ConditionExpression;
  let maxFilter: ConditionExpression;
  let searchFilter: ConditionExpression;

  async function scanProducts() {
    if (router.query.filterMin) {
      minPrice = +router.query.filterMin;
      minFilter = {
        type: 'GreaterThanOrEqualTo',
        subject: 'price',
        object: minPrice
      }
    }
    if (router.query.filterMax) {
      maxPrice = +router.query.filterMax;
      maxFilter = {
        type: 'LessThanOrEqualTo',
        subject: 'price',
        object: maxPrice
      }
    }
    if (router.query.search) {
      search = router.query.search.toString();
      searchFilter = {
        type: 'Equals',
        subject: 'title',
        object: search
      }
    }
    const caller = new Services.Products(`${process.env.NEXT_PUBLIC_API_ID_PRODUCTS}`, `${process.env.NEXT_PUBLIC_API_REGION}`, `${process.env.NEXT_PUBLIC_API_STAGE}`);

    let filter: ConditionExpression | undefined;
    if (search != '') {
      console.log(searchFilter)
      filter = searchFilter
    }
    else if (minFilter && maxFilter) {
      filter = {
        type: 'And',
        conditions: [
          minFilter,
          maxFilter
        ]
      };
    } else if (minFilter && !maxFilter) {
      filter = minFilter
    } else if (!minFilter && maxFilter) {
      filter = maxFilter
    }
    let fetchedProducts: Array<Models.Tables.IProduct> = new Array();
    const scanResult = await caller.scanAsync(25, undefined, undefined, undefined, minFilter || maxFilter || searchFilter ? filter! : undefined)
    if (scanResult.data.length === 0) {
      return []
    }
    fetchedProducts = fetchedProducts.concat(scanResult.count ? scanResult.data : scanResult as any);
    return fetchedProducts;
  }

  useEffect(() => {
    if (!isLoading) return;
    scanProducts().then(
      (data) => {
        setState(data);
        setLoading(false);
      }
    ).catch(
      (err) => {
        console.log(err.message);
      }
    )
  }, [state, setState, isLoading, setLoading])

  if (!isLoading)
    return (
      <Layout title="Product-page">
        <Stack w='95%'>
          <Filter minProp={router.query.filterMin ? router.query.filterMin as string : ''} maxProp={router.query.filterMax ? router.query.filterMax as string : ''} />
          <ProductList productList={state} />
        </Stack>
      </Layout>
    );
  else
    return (<Flex justifyContent='center'>
      <CircularProgress
        isIndeterminate
        color='red.300'
        size='3em'
      />
    </Flex>)

}
