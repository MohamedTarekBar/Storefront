/* eslint-disable quotes */
import * as utils from '../../Utils/commonImports';
import Connect from '../../database/connect';

export default class OrderProducts {
    token: string | undefined;
    user: utils.User | undefined;

    constructor(token: string) {
        if (token) {
            try {
                this.token = token;
                this.user = utils.token.decode(token) as utils.User;
            } catch (error) {
                throw utils.errorResponse.json(utils.ErrorSide.security, error);
            }
        } else {
            this.token = undefined;
        }
    }
    async create(order: utils.OrderProducts): Promise<utils.OrderProducts> {
        try {
            const sql =
                'INSERT INTO order_products (order_id, product_id, quantity) values ($1,$2,$3) RETURNING *';
            const result = await Connect.result(sql, [
                order.orderId,
                order.productId,
                order.quantity,
            ]);
            return result.rows[0];
        } catch (error) {
            throw utils.errorResponse.json(utils.ErrorSide.database, error);
        }
    }

    async index(): Promise<utils.OrderProducts[]> {
        try {
            const sql = "SELECT orders.user_uid, users.email, sum(products.price) as total, json_agg(json_build_object('orderId', orders.id ,'price' , products.price, 'name' ,products.name, 'qty',  op.quantity)) AS products from order_products as op Left join orders on op.order_id = orders.id Left join products on op.product_id = products.id Left join users on orders.user_uid = users.uid group by orders.user_uid, users.email";
            const result = await Connect.result(sql);
            return result.rows;
        } catch (error) {
            throw utils.errorResponse.json(utils.ErrorSide.database, error);
        }
    }
}
