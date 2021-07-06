import Layout from '@components/Layout';
import ProductList from '@components/product/ProductList';
import { GetStaticProps } from 'next';
import { Models, Services } from 'utilities-techsweave';
import React, { useEffect, useState } from 'react';
import { Stack } from '@chakra-ui/layout';
import Filter from '@components/filter/Filter';
import { useRouter } from 'next/router'
import { ConditionExpression } from '@aws/dynamodb-expressions';

export default function productPage({ record }) {

    const [state, setState] = useState<Models.Tables.IProduct[]>(new Array());
    const [isLoading, setLoading] = useState<boolean>(true);

    let router = useRouter();
    let minPrice: number;
    let maxPrice: number;
    let minFilter: ConditionExpression;
    let maxFilter: ConditionExpression;
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
        minFilter = {
            type: 'LessThanOrEqualTo',
            subject: 'price',
            object: maxPrice
        }
    }

    async function scanProducts() {
        const caller = new Services.Products(`${process.env.NEXT_PUBLIC_API_ID_PRODUCTS}`, `${process.env.NEXT_PUBLIC_API_REGION}`, `${process.env.NEXT_PUBLIC_API_STAGE}`);

        let filter: ConditionExpression ;

        if (minFilter || maxFilter) {
            filter = {
                type: 'And',
                conditions: [
                    minFilter,
                    maxFilter ? maxFilter
                ]
            };
        }
        console.log(filter);

        return (await caller.scanAsync(25, undefined, undefined, undefined, filter)).data

    }

    useEffect(() => {
        scanProducts().then(
            (data) => {
                setState(data);
            }
        ).catch(
            (err) => {
                console.log(err.message);
            }
        )
    }, [state, setState])

    return (
        <Layout title="Product-page">
            <Stack w='95%' direction={['column', 'column', 'row', 'row']}>
                <Filter />
                <ProductList productList={state} />
            </Stack>
        </Layout>
    );

}


// --data '"body":{"limit": 10,"filter": {"type": "And","conditions": [{"type": "GratherThanOrEqualTo","subject": "price","object": 2}]}}'