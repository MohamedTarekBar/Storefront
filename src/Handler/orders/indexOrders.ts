import { NextFunction, Request, Response } from 'express';
import Orders from '../../Models/order/order';
import * as utils from '../../Utils/commonImports';

const indexOrders = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const orders = await new Orders(res.locals.token).index();
        if (orders) {
            res.json(utils.successResponse({ data: orders }));
        } else {
            next(
                utils.errorResponse.json(
                    utils.ErrorSide.service,
                    utils.globalConstants.unexpectedError.database
                )
            );
        }
    } catch (error) {
        next(error);
    }
};
export default indexOrders;
