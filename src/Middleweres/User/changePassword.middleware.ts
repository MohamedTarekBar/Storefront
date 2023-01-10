import constants from '../../Utils/errorConstants.utils';
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import sendErr, { Side } from '../../Utils/sendError.utils';
import User from '../../types/User.type';

const changePasswordUserValidator = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const validation = Joi.object({
        id: Joi.number()
            .min(0)
            .required()
            .error(new Error(constants.user.id.valid)),
        password: Joi.string()
            .pattern(
                new RegExp(
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
                )
            )
            .error(new Error(constants.user.password.valid)),
    }).validate(
        {
            id: req.params.id,
            password: req.body.password,
        },
        { abortEarly: false }
    ).error?.message;

    if (validation) {
        throw sendErr(Side.validation, validation);
    } else {
        const user: User = {
            id: req.params.id as unknown as number,
            password: req.body.password,
            token: res.locals.token
        };
        res.locals.user = user;
        next();
    }
};

export default changePasswordUserValidator;
