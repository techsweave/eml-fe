import React from 'react';
import CreateNewProduct from '@components/product/vendor/CreateNewProduct';
import CreateNewCategory from '@components/product/vendor/CreateNewCategory';
import Layout from '@components/Layout';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';

export default function manageShop() {
  return (
    <Layout title="Manage Shop">
      <Tabs w='100%' align='center' colorScheme='red'>
        <TabList>
          <Tab>Create New Product</Tab>
          <Tab>Create New Category</Tab>
        </TabList>

        <TabPanels p='5'>
          <TabPanel>
            <CreateNewProduct />
          </TabPanel>
          <TabPanel>
            <CreateNewCategory />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Layout>
  );
}
