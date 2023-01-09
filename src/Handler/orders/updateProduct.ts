import { NextFunction, Request, Response } from 'express';
import Orders from '../../Models/order/order';
import * as utils from '../../Utils/commonImports';
const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
    const data = utils.getData(req);
    if (req.params.id) {
        try {
            data.id = req.params.id;
            const order = await new Orders(res.locals.token).edit(data);
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
    } else {
        next(utils.errorResponse.json(utils.ErrorSide.validation,utils.globalConstants.missingParams.params));
    }
};
export default updateOrder;