import constants from '../../Utils/errorConstants.utils';
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import sendErr, { Side } from '../../Utils/sendError.utils';

const editProductValidator = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const validation = Joi.object({
        id: Joi.number()
            .min(0)
            .required()
            .error(new Error(constants.product.id.valid)),
        name: Joi.string().trim()
            .error(new Error(constants.product.name.valid)),
        price: Joi.number().min(0).error(new Error(constants.product.price.valid)),
    }).validate({
        id: req.params.id,
        name: req.body.name,
        price: req.body.price
    }, { abortEarly: false }).error?.message;

    if (validation) {
        throw sendErr(Side.validation, validation);
    } else {
        res.locals.product = {
            id: req.params.id,
            name: req.body.name?  req.body.name.toLowerCase(): undefined,
            price: req.body.price,
        };
        next();
    }
};

export default editProductValidator;
