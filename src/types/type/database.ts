type User = {
    uid?: string;
    email: string;
    user_name: string;
    first_name: string;
    last_name: string;
    password: string;
    token: string;
};

type Product = {
    id?: number;
    name: string;
    price: number;
    description?: string;
    category?: string;
};

enum order_status_enum {
    complete,
    active,
}

type Order = {
    id?: number;
    user_uid?: string;
    status?: order_status_enum;
};

type OrderProducts = {
    id?: number;
    quantity: number;
    orderId: number;
    productId: number;
    products?: Product[];
};

export { User, Product, Order, OrderProducts, order_status_enum };
