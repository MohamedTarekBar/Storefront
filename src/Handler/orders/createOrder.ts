import { NextFunction, Request, Response } from 'express';
import Orders from '../../Models/order/order';
import * as utils from '../../Utils/commonImports';

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    const data = utils.getData(req);
    try {
        const order = await new Orders(res.locals.token).create(data);
        if (order) {
            res.json(utils.successResponse({ data: order}));
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

export default createOrder;