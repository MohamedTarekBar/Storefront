import constants from '../../Utils/errorConstants.utils';
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import sendErr, { Side } from '../../Utils/sendError.utils';
import OrderProducts from '../../types/OrderProducts.type';

const createOrderProductsValidator = (
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
        qty: Joi.number()
            .min(0)
            .required()
            .error(new Error(constants.orderProducts.qty.valid)),
    }).validate(req.body, { abortEarly: false }).error?.message;
    if (validation) {
        throw sendErr(Side.validation, validation);
    } else {
        const orderProducts: OrderProducts = {
            orderId: req.body.orderId,
            productId: req.body.productId,
            qty: req.body.qty,
        };
        res.locals.orderProducts = orderProducts;
        next();
    }
};

export default createOrderProductsValidator;
