import GraphQLJSClient from './graphql-client';
import types from '../types';
import productNodeQuery from './product-node-query';
import productConnectionQuery from './product-connection-query';
import collectionNodeQuery, {defaultFields as collectionDefaultFields} from './collection-node-query';
import collectionConnectionQuery from './collection-connection-query';
import checkoutQuery, {checkoutNodeQuery} from './checkout-query';
import customAttributeQuery from './custom-attribute-query';
import imageConnectionQuery from './image-connection-query';
import imageQuery from './image-query';
import lineItemConnectionQuery from './line-item-connection-query';
import mailingAddressQuery from './mailing-address-query';
import optionQuery from './option-query';
import orderQuery from './order-query';
import selectedOptionQuery from './selected-option-query';
import shippingRateQuery from './shipping-rate-query';
import variantConnectionQuery from './variant-connection-query';
import variantQuery from './variant-query';
import shopQuery from './shop-query';
import domainQuery from './domain-query';
import shopPolicyQuery from './shop-policy-query';
import ProductHelpers from './product-helpers';
import ImageHelpers from './image-helpers';

export {default as Config} from './config';

/**
 * @module js-buy-sdk
 */

const shopPolicies = [
  ['privacyPolicy', shopPolicyQuery()],
  ['termsOfService', shopPolicyQuery()],
  ['refundPolicy', shopPolicyQuery()]
];


function checkoutMutation(type, input, query, client) {
  const mutation = client.mutation((root) => {
    root.add(type, {args: {input}}, (checkoutMutationField) => {
      checkoutMutationField.add('userErrors', (userErrors) => {
        userErrors.add('message');
        userErrors.add('field');
      });
      query(checkoutMutationField, 'checkout');
    });
  });

  return client.send(mutation).then((result) => {
    const userErrors = result.data[type].userErrors;

    if (userErrors.length) {
      return Promise.reject(new Error(JSON.stringify(userErrors)));
    }

    return client.fetchAllPages(result.model[type].checkout.lineItems, {pageSize: 250}).then((lineItems) => {
      result.model[type].checkout.attrs.lineItems = lineItems;

      return result.model[type].checkout;
    });
  });
}

function fetchResourcesForProducts(products, client) {
  return products.reduce((promiseAcc, product) => {
    // Fetch the rest of the images and variants for this product
    promiseAcc.push(client.fetchAllPages(product.images, {pageSize: 250}).then((images) => {
      product.attrs.images = images;
    }));

    promiseAcc.push(client.fetchAllPages(product.variants, {pageSize: 250}).then((variants) => {
      product.attrs.variants = variants;
    }));

    return promiseAcc;
  }, []);
}

/**
 * The JS Buy SDK Client.
 * @alias module:js-buy-sdk
 */
class Client {
  constructor(config, GraphQLClientClass = GraphQLJSClient) {
    const apiUrl = `https://${config.domain}/api/graphql`;

    this.graphQLClient = new GraphQLClientClass(types, {
      url: apiUrl,
      fetcherOptions: {
        headers: {
          'X-Shopify-Storefront-Access-Token': config.storefrontAccessToken
        }
      }
    });

    this.Product = {};
    this.Product.Helpers = new ProductHelpers();

    this.Image = {};
    this.Image.Helpers = new ImageHelpers();

    /*
     * Namespace containing the query callback functions.
     * @namespace
     */
    this.Queries = {
      productNodeQuery,
      productConnectionQuery,
      collectionNodeQuery,
      collectionConnectionQuery,
      checkoutQuery,
      customAttributeQuery,
      imageConnectionQuery,
      imageQuery,
      lineItemConnectionQuery,
      mailingAddressQuery,
      optionQuery,
      orderQuery,
      selectedOptionQuery,
      shippingRateQuery,
      variantConnectionQuery,
      variantQuery,
      shopQuery,
      domainQuery,
      shopPolicyQuery,
      checkoutNodeQuery
    };
  }

  /**
   * Fetches shop information (e.g. name, description).
   *
   * ```javascript
   * client.fetchShopInfo().then((shop) => {
   *   // Do something with the shop
   * });
   * ```
   *
   * @method fetchShopInfo
   * @param {Function} [query] Callback function to specify fields to query on the shop.
   * @return {Promise|GraphModel} A promise resolving with a `GraphModel` of the shop.
   */
  fetchShopInfo(query = shopQuery()) {
    const rootQuery = this.graphQLClient.query((root) => {
      query(root, 'shop');
    });

    return this.graphQLClient.send(rootQuery).then((result) => {
      return result.model.shop;
    });
  }

  /**
   * Fetches shop policies.
   *
   * ```javascript
   * client.fetchShopPolicies().then((shop) => {
   *   // Do something with the shop
   * });
   * ```
   *
   * @method fetchShopPolicies
   * @param {Function} [query] Callback function to specify fields to query on the shop.
   * @return {Promise|GraphModel} A promise resolving with a `GraphModel` of the shop.
   */
  fetchShopPolicies(query = shopQuery(shopPolicies)) {
    const rootQuery = this.graphQLClient.query((root) => {
      query(root, 'shop');
    });

    return this.graphQLClient.send(rootQuery).then((result) => {
      return result.model.shop;
    });
  }

  /**
   * Fetches all products on the shop.
   *
   * ```javascript
   * client.fetchAllProducts().then((products) => {
   *   // Do something with the products
   * });
   * ```
   *
   * @method fetchAllProducts
   * @param {Function} [query] Callback function to specify fields to query on the products.
   * @return {Promise|GraphModel[]} A promise resolving with an array of `GraphModel`s of the products.
   */
  fetchAllProducts(query = productConnectionQuery()) {
    const rootQuery = this.graphQLClient.query((root) => {
      root.add('shop', (shop) => {
        query(shop, 'products');
      });
    });

    return this.graphQLClient.send(rootQuery).then(({model}) => {
      return Promise.all(fetchResourcesForProducts(model.shop.products, this.graphQLClient)).then(() => {
        return model.shop.products;
      });
    });
  }

  /**
   * Fetches a single product by ID on the shop.
   *
   * ```javascript
   * client.fetchProduct('123456').then((product) => {
   *   // Do something with the product
   * });
   * ```
   *
   * @method fetchProduct
   * @param {String} id The id of the product to fetch.
   * @param {Function} [query] Callback function to specify fields to query on the product.
   * @return {Promise|GraphModel} A promise resolving with a `GraphModel` of the product.
   */
  fetchProduct(id, query = productNodeQuery()) {
    const rootQuery = this.graphQLClient.query((root) => {
      query(root, 'node', id);
    });

    return this.graphQLClient.send(rootQuery).then(({model}) => {
      const promises = [];

      promises.push(this.graphQLClient.fetchAllPages(model.node.images, {pageSize: 250}).then((images) => {
        model.node.attrs.images = images;
      }));

      promises.push(this.graphQLClient.fetchAllPages(model.node.variants, {pageSize: 250}).then((variants) => {
        model.node.attrs.variants = variants;
      }));

      return Promise.all(promises).then(() => {
        return model.node;
      });
    });
  }

  /**
   * Fetches all collections on the shop, not including products.
   * To fetch collections with products use [fetchAllCollectionsWithProducts]{@link Client#fetchAllCollectionsWithProducts}.
   *
   * ```javascript
   * client.fetchAllCollections().then((collections) => {
   *   // Do something with the collections
   * });
   * ```
   *
   * @method fetchAllCollections
   * @param {Function} [query] Callback function to specify fields to query on the collections.
   * @return {Promise|GraphModel[]} A promise resolving with an array of `GraphModel`s of the collections.
   */
  fetchAllCollections(query = collectionConnectionQuery()) {
    const rootQuery = this.graphQLClient.query((root) => {
      root.add('shop', (shop) => {
        query(shop, 'collections');
      });
    });

    return this.graphQLClient.send(rootQuery).then((response) => {
      return response.model.shop.collections;
    });
  }

  /**
   * Fetches all collections on the shop, including products.
   *
   * ```javascript
   * client.fetchAllCollectionsWithProducts().then((collections) => {
   *   // Do something with the collections
   * });
   * ```
   *
   * @method fetchAllCollectionsWithProducts
   * @return {Promise|GraphModel[]} A promise resolving with an array of `GraphModel`s of the collections.
   */
  fetchAllCollectionsWithProducts() {
    const query = collectionConnectionQuery([...collectionDefaultFields, ['products', productConnectionQuery()]]);
    const rootQuery = this.graphQLClient.query((root) => {
      root.add('shop', (shop) => {
        query(shop, 'collections');
      });
    });

    return this.graphQLClient.send(rootQuery).then(({model}) => {
      const promises = model.shop.collections.reduce((promiseAcc, collection) => {
        return fetchResourcesForProducts(collection.products, this.graphQLClient);
      }, []);

      return Promise.all(promises).then(() => {
        return model.shop.collections;
      });
    });
  }

  /**
   * Fetches a single collection by ID on the shop, not including products.
   * To fetch the collection with products use [fetchCollectionWithProducts]{@link Client#fetchCollectionWithProducts}.
   *
   * ```javascript
   * client.fetchCollection('123456').then((collection) => {
   *   // Do something with the collection
   * });
   * ```
   *
   * @method fetchCollection
   * @param {String} id The id of the collection to fetch.
   * @param {Function} [query] Callback function to specify fields to query on the collection.
   * @return {Promise|GraphModel} A promise resolving with a `GraphModel` of the collection.
   */
  fetchCollection(id, query = collectionNodeQuery()) {
    const rootQuery = this.graphQLClient.query((root) => {
      query(root, 'node', id);
    });

    return this.graphQLClient.send(rootQuery).then((response) => {
      return response.model.node;
    });
  }

  /**
   * Fetches a single collection by ID on the shop, including products.
   *
   * ```javascript
   * client.fetchCollectionWithProducts('123456').then((collection) => {
   *   // Do something with the collection
   * });
   * ```
   *
   * @method fetchCollectionWithProducts
   * @param {String} id The id of the collection to fetch.
   * @param {Function} [query] Callback function to specify fields to query on the collection.
   * @return {Promise|GraphModel} A promise resolving with a `GraphModel` of the collection.
   */
  fetchCollectionWithProducts(id) {
    const query = collectionNodeQuery([...collectionDefaultFields, ['products', productConnectionQuery()]]);
    const rootQuery = this.graphQLClient.query((root) => {
      query(root, 'node', id);
    });

    return this.graphQLClient.send(rootQuery).then(({model}) => {
      return Promise.all(fetchResourcesForProducts(model.node.products, this.graphQLClient)).then(() => {
        return model.node;
      });
    });
  }

  /**
   * Fetches a checkout by ID.
   *
   * ```javascript
   * client.fetchCheckout('123456').then((checkout) => {
   *   // Do something with the checkout
   * });
   * ```
   *
   * @method fetchCheckout
   * @param {String} id The id of the checkout to fetch.
   * @param {Function} [query] Callback function to specify fields to query on the checkout.
   * @return {Promise|GraphModel} A promise resolving with a `GraphModel` of the checkout.
   */
  fetchCheckout(id, query = checkoutNodeQuery()) {
    const rootQuery = this.graphQLClient.query((root) => {
      query(root, 'node', id);
    });

    return this.graphQLClient.send(rootQuery).then((response) => {
      return response.model.node;
    });
  }

  /**
   * Fetches all products on the shop that match the query.
   *
   * ```javascript
   * client.fetchQueryProducts({title: ..., limit: ..., ...}).then((products) => {
   *   // Do something with the products
   * });
   * ```
   *
   * @method fetchQueryProducts
   * @param {Object} [queryObject] An object specifying the query data containing zero or more of:
   *   @param {String} [queryObject.title] The title of the product to fetch.
   *   @param {Array} [queryObject.updatedAtMin] Products updated since the supplied timestamp (format: 2016-09-25T21:31:33).
   *   @param {Object} [queryObject.createdAtMin] Products created since the supplied timestamp (format: 2016-09-25T21:31:33).
   *   @param {String} [queryObject.productType] The type of products to fetch.
   *   @param {Number} [queryObject.limit] The number of products to fetch.
   *   @param {String} [queryObject.sortBy] The field to use to sort products. Possible values are `title`, `updatedAt`, and `createdAt`.
   *   @param {String} [queryObject.sortDirection] The sort direction of the products.
   *     Will sort products by ascending order unless `desc` is specified.
   * @param {Function} [query] Callback function to specify fields to query on the products.
   * @return {Promise|GraphModel[]} A promise resolving with an array of `GraphModel`s of the products.
   */
  fetchQueryProducts(queryObject = {}, query = productConnectionQuery()) {
    const queryArgStrings = [];
    const options = {};

    if (queryObject.title) {
      queryArgStrings.push(`title:'${queryObject.title}'`);
    }
    if (queryObject.updatedAtMin) {
      queryArgStrings.push(`updated_at:>='${queryObject.updatedAtMin}'`);
    }
    if (queryObject.createdAtMin) {
      queryArgStrings.push(`created_at:>='${queryObject.createdAtMin}'`);
    }
    if (queryObject.productType) {
      queryArgStrings.push(`product_type:'${queryObject.productType}'`);
    }
    if (queryObject.limit) {
      options.first = queryObject.limit;
    }
    if (queryObject.sortBy) {
      let sortKey;

      switch (queryObject.sortBy) {
        case 'title':
          sortKey = this.graphQLClient.enum('TITLE');
          break;
        case 'updatedAt':
          sortKey = this.graphQLClient.enum('UPDATED_AT');
          break;
        case 'createdAt':
          sortKey = this.graphQLClient.enum('CREATED_AT');
          break;
      }

      options.sortKey = sortKey;
    }
    if (queryObject.sortDirection === 'desc') {
      options.reverse = true;
    }

    options.query = queryArgStrings.join(' ');

    const rootQuery = this.graphQLClient.query((root) => {
      root.add('shop', (shop) => {
        query(shop, 'products', options);
      });
    });

    return this.graphQLClient.send(rootQuery).then(({model}) => {
      const promises = model.shop.products.reduce((promiseAcc, product) => {
        // Fetch the rest of the images and variants for this product
        promiseAcc.push(this.graphQLClient.fetchAllPages(product.images, {pageSize: 250}).then((images) => {
          product.attrs.images = images;
        }));

        promiseAcc.push(this.graphQLClient.fetchAllPages(product.variants, {pageSize: 250}).then((variants) => {
          product.attrs.variants = variants;
        }));

        return promiseAcc;
      }, []);

      return Promise.all(promises).then(() => {
        return model.shop.products;
      });
    });
  }

  /**
   * Fetches all collections on the shop that match the query.
   *
   * ```javascript
   * client.fetchQueryCollections({title: ..., limit: ..., ...}).then((collections) => {
   *   // Do something with the collections
   * });
   * ```
   *
   * @method fetchQueryCollections
   * @param {Object} [queryObject] An object specifying the query data containing zero or more of:
   *   @param {String} [queryObject.title] The title of the collection to fetch.
   *   @param {Array} [queryObject.updatedAtMin] Collections updated since the supplied timestamp (format: 2016-09-25T21:31:33).
   *   @param {Number} [queryObject.limit] The number of collections to fetch.
   *   @param {String} [queryObject.sortBy] The field to use to sort collections. Possible values are `title` and `updatedAt`.
   *   @param {String} [queryObject.sortDirection] The sort direction of the collections.
   *     Will sort collections by ascending order unless `desc` is specified.
   * @param {Function} [query] Callback function to specify fields to query on the collections.
   * @return {Promise|GraphModel[]} A promise resolving with an array of `GraphModel`s of the collections.
   */
  fetchQueryCollections(queryObject = {}, query = collectionConnectionQuery()) {
    const queryArgStrings = [];
    const options = {};

    if (queryObject.title) {
      queryArgStrings.push(`title:'${queryObject.title}'`);
    }
    if (queryObject.updatedAtMin) {
      queryArgStrings.push(`updated_at:>='${queryObject.updatedAtMin}'`);
    }
    if (queryObject.limit) {
      options.first = queryObject.limit;
    }
    if (queryObject.sortBy) {
      let sortKey;

      switch (queryObject.sortBy) {
        case 'title':
          sortKey = this.graphQLClient.enum('TITLE');
          break;
        case 'updatedAt':
          sortKey = this.graphQLClient.enum('UPDATED_AT');
          break;
      }

      options.sortKey = sortKey;
    }
    if (queryObject.sortDirection === 'desc') {
      options.reverse = true;
    }

    options.query = queryArgStrings.join(' ');

    const rootQuery = this.graphQLClient.query((root) => {
      root.add('shop', (shop) => {
        query(shop, 'collections', options);
      });
    });

    return this.graphQLClient.send(rootQuery).then((response) => {
      return response.model.shop.collections;
    });
  }

  /**
   * Creates a checkout.
   *
   * ```javascript
   * client.createCheckout({lineItems: [ ... ], shippingAddress: {...}, ...}).then((checkout) => {
   *   // Do something with the checkout
   * });
   * ```
   *
   * @method createCheckout
   * @param {Object} [input] An input object containing zero or more of:
   *   @param {String} [input.email] An email connected to the checkout.
   *   @param {Array} [input.lineItems] A list of line items in the checkout.
   *   @param {Object} [input.shippingAddress] A shipping address.
   *   @param {String} [input.note] A note for the checkout.
   *   @param {Array} [input.customAttributes] A list of custom attributes.
   * @param {Function} [query] Callback function to specify fields to query on the checkout returned.
   * @return {Promise|GraphModel} A promise resolving with the created checkout.
   */
  createCheckout(input = {}, query = checkoutQuery()) {
    return checkoutMutation('checkoutCreate', input, query, this.graphQLClient);
  }

  /**
   * Adds line items to an existing checkout.
   *
   * ```javascript
   * client.addLineItems({checkoutId: ..., lineItems: [ ... ]}).then((checkout) => {
   *   // Do something with the updated checkout
   * });
   * ```
   *
   * @method addLineItems
   * @param {Object} input An input object containing:
   *   @param {String} input.checkoutId The ID of the checkout to add line items to.
   *   @param {Array} [input.lineItems] A list of line items to add to the checkout.
   * @param {Function} [query] Callback function to specify fields to query on the checkout returned.
   * @return {Promise|GraphModel} A promise resolving with the updated checkout.
   */
  addLineItems(input, query = checkoutQuery()) {
    return checkoutMutation('checkoutLineItemsAdd', input, query, this.graphQLClient);
  }

  /**
   * Removes line items from an existing checkout.
   *
   * ```javascript
   * client.removeLineitems({checkoutId: ..., lineItemIds: [ ... ]}).then((checkout) => {
   *   // Do something with the updated checkout
   * });
   * ```
   *
   * @method removeLineItems
   * @param {Object} input An input object containing:
   *   @param {String} input.checkoutId The ID of the checkout to remove line items from.
   *   @param {Array} input.lineItemIds A list of the ids of line items to remove from the checkout.
   * @param {Function} [query] Callback function to specify fields to query on the checkout returned.
   * @return {Promise|GraphModel} A promise resolving with the updated checkout.
   */
  removeLineItems(input, query = checkoutQuery()) {
    return checkoutMutation('checkoutLineItemsRemove', input, query, this.graphQLClient);
  }
}

export default Client;
