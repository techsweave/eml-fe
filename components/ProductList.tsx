import ProductItem from './ProductItem'

const ProductList = ({products: product[]}) => {
    return (
        <div>
            {products.map((product:product)=>(<ProductItem product={product} />))}
        </div>
    )
}

export default ProductList
