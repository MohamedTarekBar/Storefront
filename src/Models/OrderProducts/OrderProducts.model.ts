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
    create = async (op: OrderProducts): Promise<OrderProducts> => {
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

    index = async (): Promise<userOrderProducts> => {
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

    show = async (op: OrderProducts): Promise<unknown> => {
        console.log(op.orderId, op.productId);
        try {
            const sql = `SELECT op.order_id As order, op.product_id as product, op.qty, p.name, p.price FROM order_products AS op JOIN products AS p ON p.id=op.product_id WHERE op.order_id=$1 AND op.product_id=$2`;
            const result = await connect.result(sql, [
                op.orderId,
                op.productId,
            ]);

            if (result.rows.length) {
                return result.rows;
            } else {
                throw sendErr(Side.database, constants.default.noDataFound);
            }
        } catch (error) {
            throw sendErr(Side.database, error);
        }
    };
    edit = async (op: OrderProducts): Promise<OrderProducts> => {
        try {
            const sql = 'UPDATE order_products SET qty=$1, order_id=$2, product_id=$3 WHERE id=$4 RETURNING *';
            const getSql = 'Select * from order_products WHERE id=$1';
            const defaultValue = await connect.result(getSql,[op.id]);
            if (defaultValue.rows.length) {
                const oldOrderProducts: OrderProducts = defaultValue.rows[0];
                const result = await connect.result(sql, [
                    op.qty || oldOrderProducts.qty,
                    op.orderId || oldOrderProducts.orderId,
                    op.productId|| oldOrderProducts.productId,
                    op.id,
                ]);
                if (result.rows.length) {
                    return result.rows[0];
                } else {
                    throw sendErr(Side.database, constants.default.noDataFound);
                }
            } else {
                throw sendErr(Side.database, constants.default.noDataFound);
            }
        } catch (error) {
            throw sendErr(Side.database, error);
        }
    };
    delete = async (id: number):Promise<OrderProducts> => {
        try {
            const sql = 'DELETE FROM order_products WHERE id=$1';
            const result = await connect.result(sql,[id]);
            if (result.rows.length) {
                return result.rows[0];
            } else {
                throw sendErr(Side.database, constants.default.noDataFound);
            }
        } catch (error) {
            throw sendErr(Side.database, error);
        }
    };
}

export default OrderProductsModel;
