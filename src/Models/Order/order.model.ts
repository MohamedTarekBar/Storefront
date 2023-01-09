import connect from '../../database/connect';
import Order from '../../types/Order.type';
import constants from '../../Utils/errorConstants.utils';
import sendErr, { Side } from '../../Utils/sendError.utils';

class OrderModel {
    createOrder = async (order: Order): Promise<Order> => {
        try {
            const sql = 'INSERT INTO orders (user_id, status) values ($1,$2) returning *';
            const result = await connect.result(sql,[order.userId,order.status]);
            if(result.rows.length) {
                return result.rows[0];
            } else {
                throw sendErr(Side.database, constants.default.noDataFound);
            }
        } catch (error) {
            throw sendErr(Side.database, error);
        }
    };

    indexOrders = async (): Promise<Order[]> => {
        try {
            const sql = 'SELECT * FROM orders';
            const result = await connect.result(sql);
            if (result.rows.length) {
                return result.rows;
            } else {
                throw sendErr(Side.database,constants.default.noDataFound);
            }
        } catch (error) {
            throw sendErr(Side.database,error);
        }
    };

    showOrder = async (id: number): Promise<Order> => {
        try {
            const sql = 'SELECT * from orders WHERE id=$1';
            const result = await connect.result(sql,[id]);
            if(result.rows.length) {
                return result.rows[0];
            } else {
                throw sendErr(Side.database, constants.default.noDataFound);
            }
        } catch (error) {
            throw sendErr(Side.database, error);
        }
    };
}
export default OrderModel;
