import Form from '@components/Layout';
import createNew from '@components/product/CreateNew';
import { GetStaticProps } from 'next';
import { Models, Services } from 'utilities-techsweave';
import React from 'react';
import { Stack } from '@chakra-ui/layout';
// import ProductMock from '@test/ProductMock';
import Filter from '@components/filter/Filter';
import CreateNew from '@components/product/CreateNew';
import Layout from '@components/Layout';

export default function createNewProduct({ record }) {
    return (
        <Layout title="Create-new-product">
            <CreateNew></CreateNew>
        </Layout>
    );
}
