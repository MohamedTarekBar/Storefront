import constants from '../../Utils/errorConstants.utils';
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import sendErr, { Side } from '../../Utils/sendError.utils';
import token from '../../Utils/token.utils';
import User from '../../types/User.type';
import Order from '../../types/Order.type';

const editOrderValidator = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const validation = Joi.object({
        id: Joi.number()
            .min(0)
            .required()
            .error(new Error(constants.product.id.valid)),
        status: Joi.string()
            .required()
            .error(new Error(constants.order.status.valid)),
    }).validate({
        id: req.params.id,
        status: req.body.status,
    }, { abortEarly: false }).error?.message;

    if (validation) {
        throw sendErr(Side.validation, validation);
    } else {
        try {
            const user = token.decode(res.locals.token);
            if ((user as User).id) {
                const order: Order = {
                    id: req.params.id as unknown as number,
                    status: req.body.status.trim().toLowerCase(),
                    userId: ((user as User).id) as number
                };
                res.locals.order = order;
                next();
            } else {
                throw sendErr(Side.security, constants.token.decode);
            }
        } catch (error) {
            throw sendErr(Side.security, error);
        }
    }
};

export default editOrderValidator;
