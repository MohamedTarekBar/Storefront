import connect from '../../database/connect';
import Order from '../../types/Order.type';
import constants from '../../Utils/errorConstants.utils';
import sendErr, { Side } from '../../Utils/sendError.utils';

class OrderModel {
    create = async (order: Order): Promise<Order> => {
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
    index = async (): Promise<Order[]> => {
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

    show = async (id: number): Promise<Order> => {
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
    delete = async(id: number): Promise<Order> => {
        try {
            const sql = 'DELETE FROM orders WHERE id=$1 RETURNING *';
            const result = await connect.result(sql, [id]);
            if (result.rows.length) {
                return result.rows[0];
            } else {
                throw sendErr(Side.database, constants.default.noDataFound);
            }
        } catch (err) {
            throw sendErr(Side.database, err);
        }
    };
    edit = async(order: Order): Promise<Order> => {
        try {
            const sql = 'Update orders SET status=$1, user_id=$2 WHERE id=$3 RETURNING *';
            const defaultorder = await this.show(order.id as number);
            const result = await connect.result(sql,[
                order.status || defaultorder.status,
                order.userId || defaultorder.userId,
                order.id
            ]);
            if (result.rows.length) {
                return result.rows[0];
            } else {
                throw sendErr(Side.database, constants.default.noDataFound);
            }
        } catch (err) {
            throw sendErr(Side.database, err);
        }
    };
}
export default OrderModel;
