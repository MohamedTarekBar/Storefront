import constants from '../../Utils/errorConstants.utils';
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import sendErr, { Side } from '../../Utils/sendError.utils';

const deleteOrderValidator = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const validation = Joi.number()
        .min(0)
        .required()
        .error(new Error(constants.order.id.valid))
        .validate(req.params.id).error?.message;
    if (validation) {
        throw sendErr(Side.validation, validation);
    } else {
        res.locals.id = parseInt(req.params.id);
        next();
    }
};

export default deleteOrderValidator;
