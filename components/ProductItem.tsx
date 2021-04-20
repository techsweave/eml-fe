import Link from 'next/link'
import productStyles from '../styles/Product.module.css'

const ProductItem = ({ product }) => {
    return (
        <Link href="product/[id]" as={`/product/${product.id}`}>
            <div className={productStyles.card}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            </div>
        </Link>
    )
}

export default ProductItem
