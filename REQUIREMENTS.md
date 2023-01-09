# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]
- Show [token required]
- Create [token required]

#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)



                "SELECT u.email,count(p.name) as count, sum(p.price) as total, json_agg( json_build_object( 'orderId', o.id, 'price', p.price, 'name', Lower(p.name), 'qty', op.qty ) ) AS products from order_products as op Left join orders as o on op.order_id = o.id Left join products as p on op.product_id = p.id Left join users as u on o.user_id = u.id group by u.email";

            `SELECT 
            op.order_id,
            op.product_id,
            op.qty,
            p.name,
            p.price
            FROM order_products AS op
            JOIN products AS p ON p.id=op.product_id WHERE op.order_id=$1 AND op.product_id=$2`;
            