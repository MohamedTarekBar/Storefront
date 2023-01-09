import constants from '../../Utils/errorConstants.utils';
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import sendErr, { Side } from '../../Utils/sendError.utils';
import OrderProducts from '../../types/OrderProducts.type';

const createOrderProductsValidator = (
    res: Response,
    req: Request,
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
            .error(new Error(constants.order.qty.valid)),
    }).validate(req.body, { abortEarly: false }).error?.message;

    console.log(req.body);
    if (validation) {
        throw sendErr(Side.validation, validation);
    } else {
        const orderProducts: OrderProducts = {
            orderId: req.body.orderId.trim(),
            productId: req.body.productId.trim(),
            qty: req.body.qty.trim(),
        };
        res.locals.orderProducts = orderProducts;
        next();
    }
};

export default createOrderProductsValidator;
