import HttpMethod from '@libs/httpMethod';
import { LambdaMultipleDataBody } from '@libs/lambdaBody';
import { ConditionExpression } from '@aws/dynamodb-expressions';
import Product from '@models/product';
import Cart from '@models/cart';
import Stripe from 'stripe';

export default class LambdaCaller {
  private _baseUrl = `https://${process.env.NEXT_PUBLIC_API_ID}.execute-api.${process.env.NEXT_PUBLIC_API_REGION}.amazonaws.com/${process.env.NEXT_PUBLIC_API_STAGE}`;

  private readonly _session?: any;

  /**
     * @param  {object}  session     NextAuth session
     */
  public constructor(session?: any) {
    this._session = session;
  }

  /**
     * @async
     *
     * @summary Generic request to a Api Gateway Endpoint
     *
     * @param  {string} finalURL Url after domain
     * @param  {method} method Http request method
     * @param  {any} body Body of the request
     * @return {Promise<any>} Body of the response
     *
     * @throws Message of the failed request
     */
  private async requestAsync(finalURL: string, method: HttpMethod, body?: any):
  Promise<any> {
    const headers: HeadersInit = new Headers();
    headers.set('Content-Type', 'application/json');
    if (this._session) headers.set('Authorization', this._session.accessToken);

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

  /**
     * @async
     *
     * @summary Request to the endpoint of scan product
     *
     * @param  {number} limit Max number of products in scan
     * @param  {string} startKey Value of start element key
     * @param  {number} pageSize Size of the page
     * @param  {string} indexName Name of the index
     * @param  {string} filter Scan filter, see more at https://www.npmjs.com/package/@aws/dynamodb-expressions
     * @return {Promise<LambdaMultipleDataBody<Product>>}
     * Return an array of products, count, and the last evaluated key
     *
     * @throws Message of the failed request
     */
  public async scanProductAsync(
    limit: number,
    startKey?: string,
    pageSize?: number,
    indexName?: string,
    filter?: ConditionExpression,
  ):
    Promise<
    LambdaMultipleDataBody<
    Product>> {
    const finalURL = 'products/filter';
    const method = HttpMethod.POST;

    const body = {
      limit,
      startKey: startKey ? {
        id: startKey,
      } : undefined,
      pageSize,
      indexName,
      filter,
    };

    return Promise.resolve(await this.requestAsync(finalURL, method, body));
  }

  /**
     * @async
     *
     * @summary Request to the endpoint of get product
     *
     * @param  {string} id Id of the product to fetch
     * @return {Promise<Product>} Return the fetched product
     *
     * @throws Message of the failed request
     */
  public async getProductAsync(id: string): Promise<Product> {
    const finalURL = `products/${id}`;
    const method = HttpMethod.GET;

    return Promise.resolve((await this.requestAsync(finalURL, method)).data);
  }

  /**
     * @async
     *
     * @summary Request to the endpoint of create product
     *
     * @param  {Product} product Product to create
     * @return {Promise<Product>} Return the created product
     *
     * @throws Message of the failed request
     */
  public async createProductAsync(product: Product): Promise<Product> {
    const finalURL = 'products';
    const method = HttpMethod.POST;

    return Promise.resolve((await this.requestAsync(finalURL, method, product)).data);
  }

  /**
     * @async
     *
     * @summary Request to the endpoint of update product
     *
     * @param  {Product} product Product to update
     * @return {Promise<Product>} Return the updated product
     *
     * @throws Message of the failed request
     */
  public async updateProductAsync(product: Product): Promise<Product> {
    const finalURL = `products/${product.id}`;
    const method = HttpMethod.PUT;

    return Promise.resolve((await this.requestAsync(finalURL, method, product)).data);
  }

  /**
     * @async
     *
     * @summary Request to the endpoint of delete product
     *
     * @param  {string} id Id of the product to delete
     * @return {Promise<product>} Return the deleted product
     *
     * @throws Message of the failed request
     */
  public async deleteProductAsync(id: string): Promise<Product> {
    const finalURL = `products/${id}`;
    const method = HttpMethod.DELETE;

    return Promise.resolve((await this.requestAsync(finalURL, method)).data);
  }

  // #endregion Product

  // #region Cart

  /**
     * @async
     *
     * @summary Request to the endpoint of get cart
     *
     * @return {Promise<LambdaMultipleDataBody<Cart>>}
     * Return an array of carts, count, and the last evaluated key
     *
     * @throws Message of the failed request
     */
  public async getCartAsync():
  Promise<
  LambdaMultipleDataBody<
  Cart>> {
    const finalURL = 'cart';
    const method = HttpMethod.GET;

    return Promise.resolve(await this.requestAsync(finalURL, method));
  }

  // #endregion

  // #region Checkout

  /**
     * @async
     *
     * @summary Request to the endpoint of create checkout
     *
     * @param  {string} successUrl Redirect Url in case of Stripe success
     * @param  {string} cancelUrl Redirect Url in case of Stripe fail
     * @return {Promise<Stripe.Response<Stripe.Checkout.Session>>} Return an stripe session
     *
     * @throws Message of the failed request
     */
  public async goToCheckOutAsync(successUrl: string, cancelUrl: string):
  Promise<
  Stripe.Response<
  Stripe.Checkout.Session>> {
    const finalURL = 'checkout';
    const method = HttpMethod.POST;

    const body = {
      successUrl,
      cancelUrl,
    };

    return Promise.resolve((await this.requestAsync(finalURL, method, body)).data);
  }

  // #endregion
}
