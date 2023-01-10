import constants from '../../Utils/errorConstants.utils';
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import sendErr, { Side } from '../../Utils/sendError.utils';
import OrderProducts from '../../types/OrderProducts.type';

const editOrderProductsValidator = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const validation = Joi.object({
        id: Joi.number()
            .min(0)
            .required()
            .error(new Error(constants.orderProducts.id.valid)),
        orderId: Joi.number()
            .min(0)
            .error(new Error(constants.orderProducts.orderId.valid)),
        productId: Joi.number()
            .min(0)
            .error(new Error(constants.orderProducts.productId.valid)),
        qty: Joi.number().min(0)
            .error(new Error(constants.orderProducts.qty.valid)),
    }).validate({
        id: req.params.id,
        orderId: req.body.orderId,
        productId: req.body.productId,
        qty: req.body.qty
    }, { abortEarly: false }).error?.message;

    if (validation) {
        throw sendErr(Side.validation, validation);
    } else {
        const op: OrderProducts = {
            id: parseInt(req.params.id) as unknown as number,
            orderId: req.body.orderId,
            productId: req.body.productId,
            qty: req.body.qty
        };
        res.locals.orderProducts = op;
        next();
    }
};

export default editOrderProductsValidator;
