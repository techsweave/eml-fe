import { httpMethod } from '@libs/httpMethod';
import { lamdaMultipleDataBody } from '@libs/lamdaBody';
import { ConditionExpression } from '@aws/dynamodb-expressions';
import product from '@models/product';
import cart from '@models/cart';
import Stripe from 'stripe';

export class lambdaCaller {
  private static _baseUrl = `https://${process.env.NEXT_PUBLIC_API_ID}.execute-api.${process.env.NEXT_PUBLIC_API_REGION}.amazonaws.com/${process.env.NEXT_PUBLIC_API_STAGE}`;

  // No costructor
  private constructor() { }

  // Generic Request
  private static async requestAsync<T>(finalURL: string, method: httpMethod, body?: any): Promise<any> {
    const headers: HeadersInit = new Headers();
    headers.set('Content-Type', 'application/json');

    const httpResponse = await fetch(`${this._baseUrl}/${finalURL}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });

    const jsonResponse = await httpResponse.json();

    if (jsonResponse.error) {
      throw new Error(jsonResponse.error);
    }

    return Promise.resolve(jsonResponse);
  }

  // #region Products

  // For filter, see more at https://www.npmjs.com/package/@aws/dynamodb-expressions
  public static async scanProductAsync(
    limit: number,
    startKey?: string,
    pageSize?: number,
    indexName?: string,
    filter?: ConditionExpression,
  ):
    Promise<
    lamdaMultipleDataBody<
    product>> {
    const finalURL = 'products/filter';
    const method = httpMethod.POST;

    const body = {
      limit,
      startKey: startKey ? {
        id: startKey,
      } : undefined,
      pageSize,
      indexName,
      filter,
    };

    return Promise.resolve(await lambdaCaller.requestAsync(finalURL, method, body));
  }

  public static async getProductAsync(id: string): Promise<product> {
    const finalURL = `products/${id}`;
    const method = httpMethod.GET;

    return Promise.resolve((await lambdaCaller.requestAsync(finalURL, method)).data);
  }

  public static async createProductAsync(product: product): Promise<product> {
    const finalURL = 'products';
    const method = httpMethod.POST;

    return Promise.resolve((await lambdaCaller.requestAsync(finalURL, method, product)).data);
  }

  public static async updateProductAsync(product: product): Promise<product> {
    const finalURL = `products/${product.id}`;
    const method = httpMethod.PUT;

    return Promise.resolve((await lambdaCaller.requestAsync(finalURL, method, product)).data);
  }

  public static async deleteProductAsync(id: string): Promise<product> {
    const finalURL = `products/${id}`;
    const method = httpMethod.DELETE;

    return Promise.resolve((await lambdaCaller.requestAsync(finalURL, method)).data);
  }

  // #endregion Product

  // #region Cart

  public static async getCartAsync():
  Promise<
  lamdaMultipleDataBody<
  cart>> {
    const finalURL = 'cart';
    const method = httpMethod.GET;

    return Promise.resolve(await lambdaCaller.requestAsync(finalURL, method));
  }

  // #endregion

  // #region Checkout

  public static async goToCheckOutAsync(successUrl: string, cancelUrl: string):
  Promise<
  Stripe.Response<
  Stripe.Checkout.Session>> {
    const finalURL = 'checkout';
    const method = httpMethod.POST;

    const body = {
      successUrl,
      cancelUrl,
    };

    return Promise.resolve((await lambdaCaller.requestAsync(finalURL, method, body)).data);
  }

  // #endregion
}
