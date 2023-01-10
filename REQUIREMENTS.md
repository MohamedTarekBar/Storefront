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


________________________________________________________________________________________________________________
[requirements](#api-requirements) 🤦🏻‍♂️
[endpoints](#endpoints) 🫣
[scheme](#scheme) 😱
[shapes](#shapes) 😶‍🌫️


### endpoints - 
[1][doc link](#get_postman_documentation_link) '('/api') OR ('/')' GET POST WILL BE 404
### [users] {
    - Create **`token not required`** 
    - HTTP verb `POST`
    - Endpoint:- `/api/users`
    - Request Body

        ```json
            {
                "email": "Mohamed@Yahoo.com",
                "password": "Mohamed123@",
                "firstName": "Mohamed",
                "lastName": "tarek"
            }
        ```

    - Response Body -- `User object`

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

    - Authenticate **`token not required`** 
    - HTTP verb `POST`
    - Endpoint:- `/api/users/auth`
    - Request Body

        ```json
            {
                "email": "Mohamed@Yahoo.com",
                "password": "Mohamed123@",
            }
        ```

    - Response Body -- `User object`

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

- show **`token required`** 
    - HTTP verb `GET`
    - Endpoint:- `/api/users/:id`
    - params:- `id`
    - Response Body -- `User object`

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

- index **`token required`** 
    - HTTP verb `GET`
    - Endpoint:- `/api/users/`
    - Response Body -- `User object`

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
### [orders] {

}
### scheme - 

### shapes - 

### get_postman_documentation_link
    [Documentation Link](#https://documenter.getpostman.com/view/13127908/2s8Z76uUSG)