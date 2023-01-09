import constants from '../../Utils/errorConstants.utils';
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import sendErr, { Side } from '../../Utils/sendError.utils';

const createProductValidator = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const validation = Joi.object({
        name: Joi.string()
            .required()
            .error(new Error(constants.product.name.valid)),
        price: Joi.number().min(0).required(),
    }).validate(req.body, { abortEarly: false }).error?.message;

    if (validation) {
        throw sendErr(Side.validation, validation);
    } else {
        res.locals.product = {
            name: req.body.name.toLowerCase(),
            price: req.body.price,
        };
        next();
    }
};

export default createProductValidator;
