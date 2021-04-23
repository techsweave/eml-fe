import ProductItem from './ProductItem'
import productStyles from '../styles/Product.module.css'
import product from '../types/product'

const ProductList = (prop : {productlist: product[]}) => {
  return (
        <div className={productStyles.grid}>
            {prop.productlist.map((product: product) => (<ProductItem product={product} key={product.id}/>))}
        </div>
  )
}

export default ProductList
