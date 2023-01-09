/* eslint-disable quotes */
import * as utils from '../../Utils/commonImports';
import Connect from '../../database/connect';
import OrderValidation from '../../Utils/Order/OrderValidation';

export default class Orders {
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

    validateOrder = (order: utils.Order | undefined): string | undefined => {
        if (order && order.status && order.user_uid) {
            const validation = new OrderValidation({
                status: order.status,
                user_uid: this.user?.uid,
            }).validateOrder();

            if (validation.error) {
                return validation.error.message;
            } else {
                return undefined;
            }
        } else {
            return utils.globalConstants.missingParams.params;
        }
    };

    async create(order: utils.Order): Promise<utils.Order> {
        const uid = this.user?.uid;
        const status = order.status as utils.order_status_enum;
        const error = this.validateOrder({ user_uid: uid, status: status });
        if (error) {
            throw utils.errorResponse.json(utils.ErrorSide.validation, error);
        } else {
            try {
                const sql =
                    'INSERT INTO orders (user_uid, status) values ($1,$2) RETURNING *';
                const result = await Connect.result(sql, [uid, status]);
                return result.rows[0];
            } catch (error) {
                const err = 'violates foreign key constraint';
                if ((error as Error).message.includes(err)) {
                    throw utils.errorResponse.json(
                        utils.ErrorSide.security,
                        utils.globalConstants.tokenError.notVerified
                    );
                } else {
                    throw utils.errorResponse.json(
                        utils.ErrorSide.database,
                        error
                    );
                }
            }
        }
    }

    async index(): Promise<utils.Order[]> {
        try {
            const sql =
                'SELECT  orders.status, orders.id, users.uid, users.email, users.user_name  FROM orders LEFT JOIN users ON users.uid = orders.user_uid';
            const result = await Connect.result(sql);
            return result.rows;
        } catch (error) {
            throw utils.errorResponse.json(utils.ErrorSide.database, error);
        }
    }

    async edit(order: utils.Order): Promise<utils.Order> {
        if (order.id) {
            const uid = this.user?.uid;
            const status = order.status as utils.order_status_enum;
            const error = this.validateOrder({ user_uid: uid, status: status });
            if (error) {
                throw utils.errorResponse.json(
                    utils.ErrorSide.validation,
                    error
                );
            } else {
                try {
                    const sql =
                        'UPDATE orders SET status=$1 WHERE id=$2 RETURNING *';
                    const result = await Connect.result(sql, [
                        status,
                        order.id,
                    ]);
                    return result.rows[0];
                } catch (error) {
                    throw utils.errorResponse.json(
                        utils.ErrorSide.validation,
                        utils.globalConstants.missingParams.params
                    );
                }
            }
        } else {
            throw utils.errorResponse.json(
                utils.ErrorSide.validation,
                utils.globalConstants.missingParams.params
            );
        }
    }

    async delete(order: utils.Order): Promise<utils.Order> {
        if (order.id) {
            const id = order.id;
            try {
                const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *';
                const result = await Connect.result(sql, [id]);
                return result.rows[0];
            } catch (error) {
                throw utils.errorResponse.json(utils.ErrorSide.database, error);
            }
        } else {
            throw utils.errorResponse.json(
                utils.ErrorSide.validation,
                utils.globalConstants.missingParams.params
            );
        }
    }

    async show(order: utils.Order): Promise<utils.Order> {

        if (order.id) {
            const id = order.id;
            try {
                const sql = 'SELECT  orders.status, orders.id, users.uid, users.email, users.user_name  FROM orders LEFT JOIN users ON users.uid = Orders.user_uid WHERE orders.id=$1';
                const result = await Connect.result(sql, [id]);
                return result.rows[0];
            } catch (error) {
                throw utils.errorResponse.json(utils.ErrorSide.database, error);
            }
        } else {
            throw utils.errorResponse.json(
                utils.ErrorSide.validation,
                utils.globalConstants.missingParams.params
            );
        }
    }
}
