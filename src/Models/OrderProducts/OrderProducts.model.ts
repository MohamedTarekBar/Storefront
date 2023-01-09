/* eslint-disable quotes */
import connect from '../../database/connect';
import OrderProducts from '../../types/OrderProducts.type';
import constants from '../../Utils/errorConstants.utils';
import sendErr, { Side } from '../../Utils/sendError.utils';

interface userOrderProducts {
    email: string;
    total: number;
    products: [{ orderId: number; price: string; name: string; qty: number }];
}
class OrderProductsModel {
    createOrderProducts = async (op: OrderProducts): Promise<OrderProducts> => {
        try {
            const sql =
                'INSERT INTO order_products (order_id, product_id, qty) values ($1,$2,$3) returning *';
            const result = await connect.result(sql, [
                op.orderId,
                op.productId,
                op.qty,
            ]);
            if (result.rows.length) {
                return result.rows[0];
            } else {
                throw sendErr(Side.database, constants.default.noDataFound);
            }
        } catch (error) {
            throw sendErr(Side.database, error);
        }
    };

    indexOrderProducts = async (): Promise<userOrderProducts> => {
        try {
            const sql =
                "SELECT u.email,count(p.name) as count, sum(p.price) as total, json_agg( json_build_object( 'orderId', o.id, 'price', p.price, 'name', Lower(p.name), 'qty', op.qty ) ) AS products from order_products as op Left join orders as o on op.order_id = o.id Left join products as p on op.product_id = p.id Left join users as u on o.user_id = u.id group by u.email";
            const result = await connect.result(sql);
            if (result.rows.length) {
                return result.rows as unknown as userOrderProducts;
            } else {
                throw sendErr(Side.database, constants.default.noDataFound);
            }
        } catch (error) {
            throw sendErr(Side.database, error);
        }
    };

    showOrderProducts = async (id: number): Promise<unknown> => {
        try {
            const sql =
                "SELECT u.email, count(p.name) as count, sum(p.price) as total, json_agg( json_build_object( 'orderId', o.id, 'price', p.price, 'name', p.name, 'qty', op.qty ) ) AS products from order_products as op Left join orders as o on op.order_id = o.id Left join products as p on op.product_id = p.id Left join users as u on o.user_id = u.id group by u.email";
            const result = await connect.result(sql,[id]);
            if (result.rows.length) {
                return result.rows;
            } else {
                throw sendErr(Side.database, constants.default.noDataFound);
            }
        } catch (error) {
            throw sendErr(Side.database, error);
        }
    };

}

export default OrderProductsModel;
