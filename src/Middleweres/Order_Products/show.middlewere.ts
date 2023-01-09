import constants from '../../Utils/errorConstants.utils';
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import sendErr, { Side } from '../../Utils/sendError.utils';
import OrderProducts from '../../types/OrderProducts.type';

const showOrderProductsValidator = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const validation = Joi.object({
        orderId: Joi.number()
            .min(0)
            .required()
            .error(new Error(constants.order.id.valid)),
        productId: Joi.number()
            .min(0)
            .required()
            .error(new Error(constants.product.id.valid)),
    }).validate(req.params.id).error?.message;
    if (validation) {
        throw sendErr(Side.validation, validation);
    } else {
        const op: OrderProducts = {
            orderId: (req.params.orderId as unknown as number),
            productId: (req.params.productId as unknown as number)
        };
        res.locals.orderProducts = op;
        next();
    }
};

export default showOrderProductsValidator;
