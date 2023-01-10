import constants from '../../Utils/errorConstants.utils';
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import sendErr, { Side } from '../../Utils/sendError.utils';
import User from '../../types/User.type';

const deleteUserValidator = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const validation = Joi.number()
        .min(0)
        .required()
        .error(new Error(constants.user.id.valid))
        .validate(req.params.id).error?.message;
    if (validation) {
        throw sendErr(Side.validation, validation);
    } else {
        const user: User = {id: req.params.id as unknown as number ,token: res.locals.token};
        res.locals.user = user;
        next();
    }
};

export default deleteUserValidator;
