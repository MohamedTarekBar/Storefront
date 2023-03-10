# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

-   Index
-   Show
-   Create [token required]
-   [OPTIONAL] Top 5 most popular products
-   [OPTIONAL] Products by category (args: product category)

#### Users

-   Index [token required]
-   Show [token required]
-   Create [token required]

#### Orders

-   Current Order by user (args: user id)[token required]
-   [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes

#### Product

-   id
-   name
-   price
-   [OPTIONAL] category

#### User

-   id
-   firstName
-   lastName
-   password

#### Orders

-   id
-   id of each product in the order
-   quantity of each product in the order
-   user_id
-   status of order (active or complete)

---

[requirements](#api-requirements) π€¦π»ββοΈ
[endpoints](#endpoints) π«£
[scheme](#scheme) π±
[shapes](#shapes) πΆβπ«οΈ

### endpoints

### `/` or `/api` GET will redirect to postman documentaion, POST WILL BE 404

### [ users ] {

-   Create **`token not required`**

    -   HTTP verb `POST`
    -   Endpoint:- `/api/users`
    -   Request Body -- `User object`
        ```json
        {
            "email": "Mohamed@Yahoo.com",
            "password": "Mohamed123@",
            "firstName": "Mohamed",
            "lastName": "tarek"
        }
        ```
    -   Response Body -- `User object`

    ```json
    {
        "status": 200,
        "message": "success",
        "data": {
            "id": 4,
            "email": "mohamed@yahoo.com",
            "firstName": "Mohamed",
            "lastName": "tarek",
            "token": null
        }
    }
    ```

-   Authenticate **`token not required`**

    -   HTTP verb `POST`
    -   Endpoint:- `/api/users/auth`

        ```json
        {
            "email": "Mohamed@Yahoo.com",
            "password": "Mohamed123@"
        }
        ```

    -   Response Body -- `User object`

    ```json
    {
        "status": 200,
        "message": "success",
        "data": {
            "id": 4,
            "email": "mohamed@yahoo.com",
            "firstName": "Mohamed",
            "lastName": "tarek",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJtb2hhbWVkQHlhaG9vLmNvbSIsImZpcnN0TmFtZSI6Ik1vaGFtZWQiLCJsYXN0TmFtZSI6InRhcmVrIiwiaWF0IjoxNjczMzY4Njk1fQ.6QKSjrWfhWDREq7hNlKl0ByArdcQq2LoS0rk9DFNG98"
        }
    }
    ```

-   show **`token required`**

    -   HTTP verb `GET`
    -   Endpoint:- `/api/users/:id`
    -   params:- `id`

    ```json
    {
        "status": 200,
        "message": "success",
        "data": {
            "id": 4,
            "email": "mo@yahoo.com",
            "firstName": "Mohamed",
            "lastName": "tarek"
        }
    }
    ```

-   index **`token required`** - HTTP verb `GET` - Endpoint:- `/api/users/` - Response Body -- `User object`

        ```json
            {
                "status": 200,
                "message": "success",
                "data": [
                    {
                        "id": 4,
                        "email": "mo@yahoo.com",
                        "firstName": "Mohamed",
                        "lastName": "tarek"
                    }
                ]
            }
        ```

    }

### [ orders ] {

-   Create **`token required`**

    -   HTTP verb `POST`
    -   Endpoint:- `/api/orders`
    -   userId:- `will extract from token`
    -   Request Body -- `Order object`
        ```json
        {
            "status": "active"
        }
        ```
    -   Response Body -- `Order object`

    ```json
    {
        "status": 200,
        "message": "success",
        "data": {
            "id": 8,
            "status": "active",
            "user_id": 3
        }
    }
    ```

-   show **`token required`**

    -   HTTP verb `GET`
    -   Endpoint:- `/api/orders/:id`
    -   params:- `id`

    ```json
    {
        "status": 200,
        "message": "success",
        "data": {
            "id": 7,
            "status": "active",
            "user_id": 3
        }
    }
    ```

-   index **`token required`** - HTTP verb `GET` - Endpoint:- `/api/users/` - Response Body -- `User object`

        ```json
            {
                "status": 200,
                "message": "success",
                "data": [
                    {
                        "id": 7,
                        "status": "active",
                        "user_id": 3
                    },
                    {
                        "id": 8,
                        "status": "active",
                        "user_id": 3
                    }
                ]
            }
        ```

    }

### [ products ] {

-   Create **`token required`**

    -   HTTP verb `POST`
    -   Endpoint:- `/api/products`
    -   Request Body -- `Product object`
        ```json
        {
            "name": "iphone 14 Pro Max",
            "price": 2112.22
        }
        ```
    -   Response Body -- `Product object`

    ```json
    {
        "status": 200,
        "message": "success",
        "data": {
            "id": 12,
            "name": "iphone 14 pro max",
            "price": 2112.22
        }
    }
    ```

-   show **`token required`**

    -   HTTP verb `GET`
    -   Endpoint:- `/api/products/:id`
    -   params:- `id`

    ```json
    {
        "status": 200,
        "message": "success",
        "data": {
            "id": 11,
            "name": "iphone 14 pro max",
            "price": "2112.22"
        }
    }
    ```

-   index **`token required`**

    -   HTTP verb `GET`
    -   Endpoint:- `/api/users/`
    -   Response Body -- `User object`

    ```json
    {
        "status": 200,
        "message": "success",
        "data": [
            {
                "id": 4,
                "name": "iphone 14 pro max",
                "price": "2112.00"
            },
            {
                "id": 5,
                "name": "iphone 14 pro max",
                "price": "2112.00"
            },
            {
                "id": 6,
                "name": "iphone 14 pro max",
                "price": "2112.00"
            }
        ]
    }
    ```

### [ order-products ] {

-   Create **`token required`**

    -   HTTP verb `POST`
    -   Endpoint:- `/api/order-products`
    -   Request Body -- `orderProducts object`
        ```json
        {
            "orderId": 7,
            "productId": 11,
            "qty": 18
        }
        ```
    -   Response Body -- `orderProducts object`

    ```json
    {
        "status": 200,
        "message": "success",
        "data": {
            "id": 23,
            "orderId": 7,
            "productId": 11,
            "qty": 18
        }
    }
    ```

-   show **`token required`**

    -   HTTP verb `GET`
    -   Endpoint:- `/api/order-products/:opid/product/pid`
    -   params:- `opid,pid`

    ```json
    {
        "status": 200,
        "message": "success",
        "data": [
            {
                "order": 7,
                "product": 4,
                "qty": 18,
                "name": "iphone 14 pro max",
                "price": "2112.00"
            },
            {
                "order": 7,
                "product": 4,
                "qty": 5,
                "name": "iphone 14 pro max",
                "price": "2112.00"
            }
        ]
    }
    ```

-   index **`token required`** - HTTP verb `GET` - Endpoint:- `/api/order-products/` - Response Body -- `custom order-products object`

        ```json
            {
                "status": 200,
                "message": "success",
                "data": [
                    {
                        "email": "mo@yahoo.com",
                        "count": "8",
                        "total": "16896.44",
                        "products": [
                            {
                                "orderId": 7,
                                "price": 2112,
                                "name": "iphone 14 pro max",
                                "qty": 18
                            },
                            {
                                "orderId": 7,
                                "price": 2112,
                                "name": "iphone 14 pro max",
                                "qty": 5
                            }
                        ]
                    }
                ]
            }
        ```

    }

---

### scheme

User

```sql
CREATE TABLE IF NOT EXISTS public.users (
    id Serial PRIMARY KEY,
    email character varying(50) UNIQUE,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    password character varying(255) NOT NULL,
    token text
);
```

Order

```sql
CREATE TYPE status AS ENUM ('active', 'complete');
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS public.orders(
    id SERIAL PRIMARY KEY,
    status status default 'active',
    user_Id int NOT NULL REFERENCES users(id) ON DELETE CASCADE
);
```

Product

```sql
CREATE TABLE IF NOT EXISTS public.products
(
    id SERIAL,
    name character varying(50) NOT NULL,
    price numeric(10,2) NOT NULL,
    CONSTRAINT products_pkey PRIMARY KEY (id)
)
```

order_products

```sql
CREATE TABLE IF NOT EXISTS public.order_products
(
    id SERIAL PRIMARY KEY,
    order_id integer NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE ON UPDATE CASCADE,
    product_id integer NOT NULL REFERENCES public.products(id) ON DELETE CASCADE ON UPDATE CASCADE,
    qty integer
)

```

---

### shapes

users

```typescript
type User = {
    id?: number;
    email?: string;
    firstName?: string;
    lastName?: string;
    password?: string;
    token?: string;
};
```

product

```typescript
type Product = {
    id?: number;
    name?: string;
    price?: number;
};
```

order

```typescript
enum orderStatus {
    active,
    complete,
}
type Order = {
    id?: number;
    userId: number;
    status: orderStatus;
};
```

order-products

```typescript
type OrderProducts = {
    id?: number;
    orderId: number;
    productId: number;
    qty?: number;
};
```

### get_postman_documentation_link

    https://documenter.getpostman.com/view/13127908/2s8Z76uUSG
