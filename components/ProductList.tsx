import ProductItem from './ProductItem'
import product from '../types/product'

const ProductList = ({ productlist }: product[]) => {
    return (
        <div>
            {productlist.map((product: product) => (<ProductItem product={product} />))}
        </div>
    )
}

export default ProductList
