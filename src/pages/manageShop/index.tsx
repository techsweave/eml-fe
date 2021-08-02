import React from 'react';
import CreateNewProduct from '@components/product/vendor/CreateNewProduct';
import CreateNewCategory from '@components/product/vendor/CreateNewCategory';
import DeleteCategory from '@components/product/vendor/DeleteCategory'
import Layout from '@components/Layout';
import {
  Tabs, TabList, Tab, TabPanels, TabPanel,
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { Services, Models } from 'utilities-techsweave';
import { getSession } from 'next-auth/client';
import showError from '@libs/showError';

export default function manageShop(prop) {
  const { categoriesList } = prop
  return (
    <Layout title="Manage Shop">
      <Tabs w='100%' align='center' colorScheme='red'>
        <TabList>
          <Tab>Create New Product</Tab>
          <Tab>Create New Category</Tab>
          <Tab>Delete Categories</Tab>
        </TabList>

        <TabPanels p='5'>
          <TabPanel>
            <CreateNewProduct />
          </TabPanel>
          <TabPanel>
            <CreateNewCategory />
          </TabPanel>
          <TabPanel>
            <DeleteCategory categoriesList={categoriesList} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const s = await getSession(context);
  let categoriesList: Array<Models.Tables.ICategory> = new Array();
  const productCaller = new Services.Products(`${process.env.NEXT_PUBLIC_API_ID_CATEGORIES}`, `${process.env.NEXT_PUBLIC_API_REGION}`, `${process.env.NEXT_PUBLIC_API_STAGE}`, s?.accessToken as string, s?.idToken as string);
  const caller = new Services.Categories(productCaller, `${process.env.NEXT_PUBLIC_API_ID_CATEGORIES}`, `${process.env.NEXT_PUBLIC_API_REGION}`, `${process.env.NEXT_PUBLIC_API_STAGE}`, s?.accessToken as string, s?.idToken as string);
  try {
    categoriesList = (await caller.scanAsync(50)).data;
  } catch (error) {
    console.log(error);
  }
  return {
    props: {
      categoriesList,
    },
  };
};

