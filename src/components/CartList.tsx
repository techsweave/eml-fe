import CartItem from '@components/CartItem'
import cart from '@models/cart'
import product from '@models/product'
import cartStyles from '@styles/Cart.module.css'

const CartList = (prop: { cart: cart }) => {
    return (
        <div className={cartStyles.cartGrid}>
            {prop.cart.products.map((product: product) => (<CartItem product={product} key={product.id} />))}
            <p className={cartStyles.total}>total: {prop.cart.total}</p>
        </div>
    )
}

export default CartList
