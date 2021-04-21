import Link from 'next/link'
import product from '../types/product'
import cartStyles from '../styles/Cart.module.css'

const CartItem = (prop: {product :product}) => {
  return (
        <Link href="product/[id]" as={`/product/${prop.product.id}`}>
            <div className={cartStyles.cartRow}>
                <p>{prop.product.name}</p>
                <p>{prop.product.quantity}</p>
                <p>{prop.product.price}</p>
            </div>
        </Link>
  )
}

export default CartItem
