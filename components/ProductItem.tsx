import Link from 'next/link'
import productStyles from '../styles/Product.module.css'

const ProductItem = ({ product }) => {
    return (
        <Link href="product/[id]" as={`/product/${product.id}`}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
        </Link>
    )
}

export default ProductItem
