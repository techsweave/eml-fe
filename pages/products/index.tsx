import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '../../components/Layout'
import ProductList from '../../components/ProductList'
import { ReactNode } from 'react'
import product from '../../types/product'

const alltheprods: product[] = [{ id: 1, name: "cucchiaio", description: "resistente cucchiaio in acciaio", price: 10, quantity: 20 },
{ id: 2, name: "siringa", description: "ottima siringa", price: 1, quantity: 2 },
{ id: 3, name: "accendino", description: "potente accendino", price: 2000, quantity: 1 }]


export default function productPage() {
    return (

        <Layout title="Product-page">
            <div>
                <h1 id="productH1">Product List</h1>
                <ul id="productList">
                    <li id="productItem"><Image priority src="/images/EML-Logo.svg" width={200} height={200}></Image><span><p>Articolo 1</p></span></li>
                    <li id="productItem"><Image priority src="/images/EML-Logo.svg" width={200} height={200}></Image><span><p>Articolo 2</p></span></li>
                    <li id="productItem"><Image priority src="/images/EML-Logo.svg" width={200} height={200}></Image><span><p>Articolo 3</p></span></li>
                    <li id="productItem"><Image priority src="/images/EML-Logo.svg" width={200} height={200}></Image><span><p>Articolo 4</p></span></li>
                    <li id="productItem"><Image priority src="/images/EML-Logo.svg" width={200} height={200}></Image><span><p>Articolo 5</p></span></li>
                    <li id="productItem"><Image priority src="/images/EML-Logo.svg" width={200} height={200}></Image><span><p>Articolo 6</p></span></li>
                    <li id="productItem"><Image priority src="/images/EML-Logo.svg" width={200} height={200}></Image><span><p>Articolo 7</p></span></li>
                </ul>
            </div>
            {/* <ProductList productlist={alltheprods} /> */}
        </Layout>


    )
}

/*  */