import Link from 'next/link'
import productStyles from '../styles/Product.module.css'
import product from '../types/product'

const ProductItem = (prop: {product:product}) => {
  return (
        <Link href="product/[id]" as={`/product/${prop.product.id}`}>
            <div className={productStyles.card}>
                <h3>{prop.product.name}</h3>
                <p>{prop.product.description}</p>
            </div>
        </Link>
  )
}

export default ProductItem
