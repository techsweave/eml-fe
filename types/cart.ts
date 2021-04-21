import product from './product'

export default interface cart {
    readonly ID: number,
    readonly products : product[],
    readonly total: number
}
