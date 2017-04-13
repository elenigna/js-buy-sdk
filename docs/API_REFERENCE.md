## Modules

<dl>
<dt><a href="#module_js-buy-sdk">js-buy-sdk</a></dt>
<dd></dd>
</dl>

## Classes

<dl>
<dt><a href="#ImageHelpers">ImageHelpers</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#imageForSize">imageForSize(image, options)</a> ⇒ <code>String</code></dt>
<dd><p>Generates the image src for a resized image with maximum dimensions <code>maxWidth</code> and <code>maxHeight</code>.
Images do not scale up.</p>
</dd>
</dl>

<a name="module_js-buy-sdk"></a>

## js-buy-sdk

* [js-buy-sdk](#module_js-buy-sdk)
    * [Client](#exp_module_js-buy-sdk--Client) ⏏
        * [~fetchShopInfo([query])](#module_js-buy-sdk--Client..fetchShopInfo) ⇒ <code>Promise</code> \| <code>GraphModel</code>
        * [~fetchShopPolicies([query])](#module_js-buy-sdk--Client..fetchShopPolicies) ⇒ <code>Promise</code> \| <code>GraphModel</code>
        * [~fetchAllProducts([query])](#module_js-buy-sdk--Client..fetchAllProducts) ⇒ <code>Promise</code> \| <code>Array.&lt;GraphModel&gt;</code>
        * [~fetchProduct(id, [query])](#module_js-buy-sdk--Client..fetchProduct) ⇒ <code>Promise</code> \| <code>GraphModel</code>
        * [~fetchAllCollections([query])](#module_js-buy-sdk--Client..fetchAllCollections) ⇒ <code>Promise</code> \| <code>Array.&lt;GraphModel&gt;</code>
        * [~fetchAllCollectionsWithProducts()](#module_js-buy-sdk--Client..fetchAllCollectionsWithProducts) ⇒ <code>Promise</code> \| <code>Array.&lt;GraphModel&gt;</code>
        * [~fetchCollection(id, [query])](#module_js-buy-sdk--Client..fetchCollection) ⇒ <code>Promise</code> \| <code>GraphModel</code>
        * [~fetchCollectionWithProducts(id, [query])](#module_js-buy-sdk--Client..fetchCollectionWithProducts) ⇒ <code>Promise</code> \| <code>GraphModel</code>
        * [~fetchCheckout(id, [query])](#module_js-buy-sdk--Client..fetchCheckout) ⇒ <code>Promise</code> \| <code>GraphModel</code>
        * [~fetchQueryProducts([queryObject], [query])](#module_js-buy-sdk--Client..fetchQueryProducts) ⇒ <code>Promise</code> \| <code>Array.&lt;GraphModel&gt;</code>
        * [~fetchQueryCollections([queryObject], [query])](#module_js-buy-sdk--Client..fetchQueryCollections) ⇒ <code>Promise</code> \| <code>Array.&lt;GraphModel&gt;</code>
        * [~createCheckout([input], [query])](#module_js-buy-sdk--Client..createCheckout) ⇒ <code>Promise</code> \| <code>GraphModel</code>
        * [~addLineItems(input, [query])](#module_js-buy-sdk--Client..addLineItems) ⇒ <code>Promise</code> \| <code>GraphModel</code>
        * [~removeLineItems(input, [query])](#module_js-buy-sdk--Client..removeLineItems) ⇒ <code>Promise</code> \| <code>GraphModel</code>

<a name="exp_module_js-buy-sdk--Client"></a>

### Client ⏏
The JS Buy SDK Client.

**Kind**: Exported class  
<a name="module_js-buy-sdk--Client..fetchShopInfo"></a>

#### Client~fetchShopInfo([query]) ⇒ <code>Promise</code> \| <code>GraphModel</code>
Fetches shop information (e.g. name, description).

```javascript
client.fetchShopInfo().then((shop) => {
  // Do something with the shop
});
```

**Kind**: inner method of <code>[Client](#exp_module_js-buy-sdk--Client)</code>  
**Returns**: <code>Promise</code> \| <code>GraphModel</code> - A promise resolving with a `GraphModel` of the shop.  

| Param | Type | Description |
| --- | --- | --- |
| [query] | <code>function</code> | Callback function to specify fields to query on the shop. |

<a name="module_js-buy-sdk--Client..fetchShopPolicies"></a>

#### Client~fetchShopPolicies([query]) ⇒ <code>Promise</code> \| <code>GraphModel</code>
Fetches shop policies.

```javascript
client.fetchShopPolicies().then((shop) => {
  // Do something with the shop
});
```

**Kind**: inner method of <code>[Client](#exp_module_js-buy-sdk--Client)</code>  
**Returns**: <code>Promise</code> \| <code>GraphModel</code> - A promise resolving with a `GraphModel` of the shop.  

| Param | Type | Description |
| --- | --- | --- |
| [query] | <code>function</code> | Callback function to specify fields to query on the shop. |

<a name="module_js-buy-sdk--Client..fetchAllProducts"></a>

#### Client~fetchAllProducts([query]) ⇒ <code>Promise</code> \| <code>Array.&lt;GraphModel&gt;</code>
Fetches all products on the shop.

```javascript
client.fetchAllProducts().then((products) => {
  // Do something with the products
});
```

**Kind**: inner method of <code>[Client](#exp_module_js-buy-sdk--Client)</code>  
**Returns**: <code>Promise</code> \| <code>Array.&lt;GraphModel&gt;</code> - A promise resolving with an array of `GraphModel`s of the products.  

| Param | Type | Description |
| --- | --- | --- |
| [query] | <code>function</code> | Callback function to specify fields to query on the products. |

<a name="module_js-buy-sdk--Client..fetchProduct"></a>

#### Client~fetchProduct(id, [query]) ⇒ <code>Promise</code> \| <code>GraphModel</code>
Fetches a single product by ID on the shop.

```javascript
client.fetchProduct('123456').then((product) => {
  // Do something with the product
});
```

**Kind**: inner method of <code>[Client](#exp_module_js-buy-sdk--Client)</code>  
**Returns**: <code>Promise</code> \| <code>GraphModel</code> - A promise resolving with a `GraphModel` of the product.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The id of the product to fetch. |
| [query] | <code>function</code> | Callback function to specify fields to query on the product. |

<a name="module_js-buy-sdk--Client..fetchAllCollections"></a>

#### Client~fetchAllCollections([query]) ⇒ <code>Promise</code> \| <code>Array.&lt;GraphModel&gt;</code>
Fetches all collections on the shop, not including products.
To fetch collections with products use [fetchAllCollectionsWithProducts](Client#fetchAllCollectionsWithProducts).

```javascript
client.fetchAllCollections().then((collections) => {
  // Do something with the collections
});
```

**Kind**: inner method of <code>[Client](#exp_module_js-buy-sdk--Client)</code>  
**Returns**: <code>Promise</code> \| <code>Array.&lt;GraphModel&gt;</code> - A promise resolving with an array of `GraphModel`s of the collections.  

| Param | Type | Description |
| --- | --- | --- |
| [query] | <code>function</code> | Callback function to specify fields to query on the collections. |

<a name="module_js-buy-sdk--Client..fetchAllCollectionsWithProducts"></a>

#### Client~fetchAllCollectionsWithProducts() ⇒ <code>Promise</code> \| <code>Array.&lt;GraphModel&gt;</code>
Fetches all collections on the shop, including products.

```javascript
client.fetchAllCollectionsWithProducts().then((collections) => {
  // Do something with the collections
});
```

**Kind**: inner method of <code>[Client](#exp_module_js-buy-sdk--Client)</code>  
**Returns**: <code>Promise</code> \| <code>Array.&lt;GraphModel&gt;</code> - A promise resolving with an array of `GraphModel`s of the collections.  
<a name="module_js-buy-sdk--Client..fetchCollection"></a>

#### Client~fetchCollection(id, [query]) ⇒ <code>Promise</code> \| <code>GraphModel</code>
Fetches a single collection by ID on the shop, not including products.
To fetch the collection with products use [fetchCollectionWithProducts](Client#fetchCollectionWithProducts).

```javascript
client.fetchCollection('123456').then((collection) => {
  // Do something with the collection
});
```

**Kind**: inner method of <code>[Client](#exp_module_js-buy-sdk--Client)</code>  
**Returns**: <code>Promise</code> \| <code>GraphModel</code> - A promise resolving with a `GraphModel` of the collection.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The id of the collection to fetch. |
| [query] | <code>function</code> | Callback function to specify fields to query on the collection. |

<a name="module_js-buy-sdk--Client..fetchCollectionWithProducts"></a>

#### Client~fetchCollectionWithProducts(id, [query]) ⇒ <code>Promise</code> \| <code>GraphModel</code>
Fetches a single collection by ID on the shop, including products.

```javascript
client.fetchCollectionWithProducts('123456').then((collection) => {
  // Do something with the collection
});
```

**Kind**: inner method of <code>[Client](#exp_module_js-buy-sdk--Client)</code>  
**Returns**: <code>Promise</code> \| <code>GraphModel</code> - A promise resolving with a `GraphModel` of the collection.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The id of the collection to fetch. |
| [query] | <code>function</code> | Callback function to specify fields to query on the collection. |

<a name="module_js-buy-sdk--Client..fetchCheckout"></a>

#### Client~fetchCheckout(id, [query]) ⇒ <code>Promise</code> \| <code>GraphModel</code>
Fetches a checkout by ID.

```javascript
client.fetchCheckout('123456').then((checkout) => {
  // Do something with the checkout
});
```

**Kind**: inner method of <code>[Client](#exp_module_js-buy-sdk--Client)</code>  
**Returns**: <code>Promise</code> \| <code>GraphModel</code> - A promise resolving with a `GraphModel` of the checkout.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The id of the checkout to fetch. |
| [query] | <code>function</code> | Callback function to specify fields to query on the checkout. |

<a name="module_js-buy-sdk--Client..fetchQueryProducts"></a>

#### Client~fetchQueryProducts([queryObject], [query]) ⇒ <code>Promise</code> \| <code>Array.&lt;GraphModel&gt;</code>
Fetches all products on the shop that match the query.

```javascript
client.fetchQueryProducts({title: ..., limit: ..., ...}).then((products) => {
  // Do something with the products
});
```

**Kind**: inner method of <code>[Client](#exp_module_js-buy-sdk--Client)</code>  
**Returns**: <code>Promise</code> \| <code>Array.&lt;GraphModel&gt;</code> - A promise resolving with an array of `GraphModel`s of the products.  

| Param | Type | Description |
| --- | --- | --- |
| [queryObject] | <code>Object</code> | An object specifying the query data containing zero or more of: |
| [queryObject.title] | <code>String</code> | The title of the product to fetch. |
| [queryObject.updatedAtMin] | <code>Array</code> | Products updated since the supplied timestamp (format: 2016-09-25T21:31:33). |
| [queryObject.createdAtMin] | <code>Object</code> | Products created since the supplied timestamp (format: 2016-09-25T21:31:33). |
| [queryObject.productType] | <code>String</code> | The type of products to fetch. |
| [queryObject.limit] | <code>Number</code> | The number of products to fetch. |
| [queryObject.sortBy] | <code>String</code> | The field to use to sort products. Possible values are `title`, `updatedAt`, and `createdAt`. |
| [queryObject.sortDirection] | <code>String</code> | The sort direction of the products.     Will sort products by ascending order unless `desc` is specified. |
| [query] | <code>function</code> | Callback function to specify fields to query on the products. |

<a name="module_js-buy-sdk--Client..fetchQueryCollections"></a>

#### Client~fetchQueryCollections([queryObject], [query]) ⇒ <code>Promise</code> \| <code>Array.&lt;GraphModel&gt;</code>
Fetches all collections on the shop that match the query.

```javascript
client.fetchQueryCollections({title: ..., limit: ..., ...}).then((collections) => {
  // Do something with the collections
});
```

**Kind**: inner method of <code>[Client](#exp_module_js-buy-sdk--Client)</code>  
**Returns**: <code>Promise</code> \| <code>Array.&lt;GraphModel&gt;</code> - A promise resolving with an array of `GraphModel`s of the collections.  

| Param | Type | Description |
| --- | --- | --- |
| [queryObject] | <code>Object</code> | An object specifying the query data containing zero or more of: |
| [queryObject.title] | <code>String</code> | The title of the collection to fetch. |
| [queryObject.updatedAtMin] | <code>Array</code> | Collections updated since the supplied timestamp (format: 2016-09-25T21:31:33). |
| [queryObject.limit] | <code>Number</code> | The number of collections to fetch. |
| [queryObject.sortBy] | <code>String</code> | The field to use to sort collections. Possible values are `title` and `updatedAt`. |
| [queryObject.sortDirection] | <code>String</code> | The sort direction of the collections.     Will sort collections by ascending order unless `desc` is specified. |
| [query] | <code>function</code> | Callback function to specify fields to query on the collections. |

<a name="module_js-buy-sdk--Client..createCheckout"></a>

#### Client~createCheckout([input], [query]) ⇒ <code>Promise</code> \| <code>GraphModel</code>
Creates a checkout.

```javascript
client.createCheckout({lineItems: [ ... ], shippingAddress: {...}, ...}).then((checkout) => {
  // Do something with the checkout
});
```

**Kind**: inner method of <code>[Client](#exp_module_js-buy-sdk--Client)</code>  
**Returns**: <code>Promise</code> \| <code>GraphModel</code> - A promise resolving with the created checkout.  

| Param | Type | Description |
| --- | --- | --- |
| [input] | <code>Object</code> | An input object containing zero or more of: |
| [input.email] | <code>String</code> | An email connected to the checkout. |
| [input.lineItems] | <code>Array</code> | A list of line items in the checkout. |
| [input.shippingAddress] | <code>Object</code> | A shipping address. |
| [input.note] | <code>String</code> | A note for the checkout. |
| [input.customAttributes] | <code>Array</code> | A list of custom attributes. |
| [query] | <code>function</code> | Callback function to specify fields to query on the checkout returned. |

<a name="module_js-buy-sdk--Client..addLineItems"></a>

#### Client~addLineItems(input, [query]) ⇒ <code>Promise</code> \| <code>GraphModel</code>
Adds line items to an existing checkout.

```javascript
client.addLineItems({checkoutId: ..., lineItems: [ ... ]}).then((checkout) => {
  // Do something with the updated checkout
});
```

**Kind**: inner method of <code>[Client](#exp_module_js-buy-sdk--Client)</code>  
**Returns**: <code>Promise</code> \| <code>GraphModel</code> - A promise resolving with the updated checkout.  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>Object</code> | An input object containing: |
| input.checkoutId | <code>String</code> | The ID of the checkout to add line items to. |
| [input.lineItems] | <code>Array</code> | A list of line items to add to the checkout. |
| [query] | <code>function</code> | Callback function to specify fields to query on the checkout returned. |

<a name="module_js-buy-sdk--Client..removeLineItems"></a>

#### Client~removeLineItems(input, [query]) ⇒ <code>Promise</code> \| <code>GraphModel</code>
Removes line items from an existing checkout.

```javascript
client.removeLineitems({checkoutId: ..., lineItemIds: [ ... ]}).then((checkout) => {
  // Do something with the updated checkout
});
```

**Kind**: inner method of <code>[Client](#exp_module_js-buy-sdk--Client)</code>  
**Returns**: <code>Promise</code> \| <code>GraphModel</code> - A promise resolving with the updated checkout.  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>Object</code> | An input object containing: |
| input.checkoutId | <code>String</code> | The ID of the checkout to remove line items from. |
| input.lineItemIds | <code>Array</code> | A list of the ids of line items to remove from the checkout. |
| [query] | <code>function</code> | Callback function to specify fields to query on the checkout returned. |

<a name="ImageHelpers"></a>

## ImageHelpers
**Kind**: global class  
<a name="imageForSize"></a>

## imageForSize(image, options) ⇒ <code>String</code>
Generates the image src for a resized image with maximum dimensions `maxWidth` and `maxHeight`.
Images do not scale up.

**Kind**: global function  
**Returns**: <code>String</code> - The image src for the resized image  

| Param | Type | Description |
| --- | --- | --- |
| image | <code>Object</code> | The original image model to generate the image src for |
| options | <code>Object</code> | An options object containing: |
| options.maxHeight | <code>Integer</code> | The maximum height for the image |
| options.maxWidth | <code>Integer</code> | The maximum width for the image |

