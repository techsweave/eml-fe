import Layout from '@components/Layout';
import ProductList from '@components/product/ProductList';
import { Models, Services, AuthenticatedUser } from 'utilities-techsweave';
import React from 'react';
import {
  Tab, TabList, TabPanel, TabPanels, Tabs,
} from '@chakra-ui/react';
import { getSession } from 'next-auth/client';
import { GetServerSideProps } from 'next';
import { ConditionExpression } from '@aws/dynamodb-expressions';
import * as AWS from 'aws-sdk';

export default function productPage(prop) {
  const { salableProducts, privateProducts, isVendor } = prop;
  if (!isVendor) {
    return (
      <Layout title='Vendor Products List Page'>
        <h1> 403 - Forbidden, access to the page denied </h1>
      </Layout>
    );
  }
  return (
    <Layout title='Vendor Products List Page'>
      <Tabs w='100%' align='center' colorScheme='red'>
        <TabList>
          <Tab>Salable Products</Tab>
          <Tab>Private Products</Tab>
        </TabList>

        <TabPanels p='5'>
          <TabPanel>
            <ProductList productList={salableProducts} vendor={isVendor} />
          </TabPanel>
          <TabPanel>
            <ProductList productList={privateProducts} vendor={isVendor} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  AWS.config.update({
    region: process.env.NEXT_PUBLIC_API_REGION as string,
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY as string,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS as string,
    },
  });
  const s = await getSession(context);
  const user = await AuthenticatedUser.fromToken(s?.accessToken as string);
  const isVendor = await user.isVendor(process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID as string);
  const caller = new Services.Products(
    process.env.NEXT_PUBLIC_API_ID_PRODUCTS as string,
    process.env.NEXT_PUBLIC_API_REGION as string,
    process.env.NEXT_PUBLIC_API_STAGE as string,
    s?.accessToken as string,
    s?.idToken as string,
  );
  let salableProducts: Models.Tables.IProduct[] = [];
  let salableScanResult: Models.IMultipleDataBody<Models.Tables.IProduct> = {
    data: [],
    count: 0,
  };

  const filter: ConditionExpression = {
    type: 'Equals',
    subject: 'isSalable',
    object: true,
  };
  do {
    salableScanResult = await caller.scanAsync(50,
      salableScanResult?.lastEvaluatedKey?.id, undefined, undefined, filter);
    salableProducts = salableProducts.concat(salableScanResult.count ? salableScanResult.data
      : salableScanResult as any);
  } while (salableScanResult?.lastEvaluatedKey);

  let privateProducts: Models.Tables.IProduct[] = [];
  let privateScanResult: Models.IMultipleDataBody<Models.Tables.IProduct> = {
    data: [],
    count: 0,
  };

  do {
    privateScanResult = await caller.scanAsync(50, privateScanResult?.lastEvaluatedKey?.id, undefined, undefined, { type: 'Equals', subject: 'isSalable', object: false });
    privateProducts = privateProducts.concat(privateScanResult.count ? privateScanResult.data
      : privateScanResult as any);
  } while (privateScanResult?.lastEvaluatedKey);
  if (salableScanResult.data && salableScanResult.data.length === 0) {
    salableProducts = [];
  }
  if (privateScanResult.data && privateScanResult.data.length === 0) {
    privateProducts = [];
  }
  return {
    props: {
      salableProducts,
      privateProducts,
      isVendor,
    },
  };
};
