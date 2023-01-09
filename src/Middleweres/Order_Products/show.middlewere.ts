import constants from '../../Utils/errorConstants.utils';
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import sendErr, { Side } from '../../Utils/sendError.utils';

const showOrderProductsValidator = (req: Request, res: Response, next: NextFunction) => {
    const validation = Joi.number()
        .min(0)
        .required()
        .error(new Error(constants.user.id.valid))
        .validate(req.params.id).error?.message;
    if (validation) {
        throw sendErr(Side.validation, validation);
    } else {
        console.log('rs', res.locals.id , req.params.id);
        res.locals.id = req.params.id;
        next();
    }
};

export default showOrderProductsValidator;
