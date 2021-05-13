
import { httpMethod } from "@libs/httpMethod";
import { lambdaMultipleDataBody } from "@libs/lambdaBody";
import { ConditionExpression } from "@aws/dynamodb-expressions"
import product from "@models/product";
import cart from "@models/cart";
import Stripe from "stripe";


export class lambdaCaller {

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

    // For filter, see more at https://www.npmjs.com/package/@aws/dynamodb-expressions
    public static async scanProductAsync(
        limit: number,
        startKey?: string,
        pageSize?: number,
        indexName?: string,
        filter?: ConditionExpression):
        Promise<
            lambdaMultipleDataBody<
                product>> {

        let finalURL = 'products/filter'
        let method = httpMethod.POST

        let body = {
            limit: limit,
            startKey: startKey ? {
                id: startKey
            } : undefined,
            pageSize: pageSize,
            indexName: indexName,
            filter: filter
        }

        return Promise.resolve(await lambdaCaller.requestAsync(finalURL, method, body))
    }

    public static async getProductAsync(id: string): Promise<product> {
        let finalURL = 'products/' + id
        let method = httpMethod.GET

        return Promise.resolve((await lambdaCaller.requestAsync(finalURL, method)).data)
    }

    public static async createProductAsync(product: product): Promise<product> {
        let finalURL = 'products'
        let method = httpMethod.POST

        return Promise.resolve((await lambdaCaller.requestAsync(finalURL, method, product)).data)
    }

    public static async updateProductAsync(product: product): Promise<product> {
        let finalURL = 'products/' + product.id
        let method = httpMethod.PUT

        return Promise.resolve((await lambdaCaller.requestAsync(finalURL, method, product)).data)
    }

    public static async deleteProductAsync(id: string): Promise<product> {
        let finalURL = 'products/' + id
        let method = httpMethod.DELETE

        return Promise.resolve((await lambdaCaller.requestAsync(finalURL, method)).data)
    }

    //#endregion Product

    //#region Cart

    public static async getCartAsync():
        Promise<
            lambdaMultipleDataBody<
                cart>> {

        let finalURL = 'cart'
        let method = httpMethod.GET

        return Promise.resolve(await lambdaCaller.requestAsync(finalURL, method))
    }

    //#endregion

    //#region Checkout

    public static async goToCheckOutAsync(successUrl: string, cancelUrl: string):
        Promise<
            Stripe.Response<
                Stripe.Checkout.Session>> {

        let finalURL = 'checkout'
        let method = httpMethod.POST

        let body = {
            successUrl: successUrl,
            cancelUrl: cancelUrl
        }

        return Promise.resolve((await lambdaCaller.requestAsync(finalURL, method, body)).data)
    }

    //#endregion
}