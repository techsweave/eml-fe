export default interface product {
    readonly id: string,
    readonly name: string,
    readonly description: string,
    readonly image: string[],
    readonly price: number,
    readonly taxes: number,
    readonly discount: number,
    quantity: number
}