import { NextFunction, Request, Response } from 'express';
import OrderProducts from '../../Models/order-products/order-products';
import * as utils from '../../Utils/commonImports';

const indexOrderProducts = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const orders = await new OrderProducts(res.locals.token).index();
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
export default indexOrderProducts;
