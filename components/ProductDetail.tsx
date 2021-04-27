import product from '../types/product'
import ProductDetailStyles from '../styles/ProductDetail.module.css'

const ProductDetail = (prop: {product:product}) => {
  return (
        <div>
          <p className = {ProductDetailStyles.bold}>
            name:{prop.product.name}
          </p>
          <p>
            description:{prop.product.description}
          </p>
          <p>
            price:{prop.product.price}
          </p>
        </div>
  )
}

export default ProductDetail
