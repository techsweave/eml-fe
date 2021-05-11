
import { httpMethod } from "./httpMethod";
import { lamdaSingleDataBody } from "./lamdaBody";
import { lamdaMultipleDataBody } from "./lamdaBody";
import { ConditionExpression } from "@aws/dynamodb-expressions"
import product from "../../../types/product";


export class lambdaCaller<T> {

    private static _baseUrl: string = 'https://' + process.env.API_ID + '.execute-api.' + process.env.API_REGION + '.amazonaws.com/' + process.env.API_STAGE;

    // No costructor
    private constructor() { }

    // Generic Request
    private static async requestAsync<T>(finalURL: string, method: httpMethod, body?: any): Promise<any> {
        let headers: HeadersInit = new Headers()
        headers.set("Content-Type", "application/json")

        const httpResponse = await fetch(this._baseUrl + '/' + finalURL, {
            method: method,
            headers: headers,
            body: body ? JSON.stringify(body) : null
        })

        const jsonResponse = await httpResponse.json()

        if (jsonResponse.error) {
            throw new Error(jsonResponse.error)
        }

        return Promise.resolve(jsonResponse)
    }

    //#region Products

    public static async scanProductAsync(
        limit: number,
        startKey?: string,
        pageSize?: number,
        indexName?: string,
        filter?: ConditionExpression): Promise<lamdaMultipleDataBody<product>> {

        let finalURL = 'products/filter'
        let method = httpMethod.POST

        let options = {
            limit: limit,
            startKey: startKey ? {
                id: startKey
            } : null,
            pageSize: pageSize,
            indexName: indexName,
            filter: filter
        }

        return Promise.resolve(await lambdaCaller.requestAsync(finalURL, method, options))
    }

    public static async getProductAsync(id: string): Promise<lamdaSingleDataBody<product>> {
        let finalURL = 'products/' + id
        let method = httpMethod.GET

        return Promise.resolve(await lambdaCaller.requestAsync(finalURL, method))
    }

    public static async createProductAsync(product: product): Promise<lamdaSingleDataBody<product>> {
        let finalURL = 'products'
        let method = httpMethod.POST

        return Promise.resolve(await lambdaCaller.requestAsync(finalURL, method, product))
    }

    public static async updateProductAsync(product: product): Promise<lamdaSingleDataBody<product>> {
        let finalURL = 'products/' + product.id
        let method = httpMethod.PUT

        return Promise.resolve(await lambdaCaller.requestAsync(finalURL, method, product))
    }

    public static async deleteProductAsync(id: string): Promise<lamdaSingleDataBody<product>> {
        let finalURL = 'products/' + id
        let method = httpMethod.DELETE

        return Promise.resolve(await lambdaCaller.requestAsync(finalURL, method))
    }

    //#endregion Product
}