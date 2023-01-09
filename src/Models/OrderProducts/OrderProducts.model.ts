/* eslint-disable quotes */
import connect from '../../database/connect';
import constants from '../../Utils/errorConstants.utils';
import sendErr, { Side } from '../../Utils/sendError.utils';

class OrderProductsModel {
    indexOrderProducts = async (): Promise<unknown> => {
        try {
            const sql =
                "SELECT  u.email sum(p.price) as total, json_agg( json_build_object( 'orderId', o.id, 'price', p.price, 'name', p.name, 'qty', op.qty ) ) AS products from order_products as op Left join orders as o on op.order_id = orders.id Left join products as p on op.product_id = products.id Left join users as u on o.user_id = users.id group by u.email";
            const result = await connect.result(sql);
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
