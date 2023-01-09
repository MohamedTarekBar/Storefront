import constants from '../../Utils/errorConstants.utils';
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import sendErr, { Side } from '../../Utils/sendError.utils';
import User from '../../types/User.type';

const authUserValidator = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log('sa');
    const validation = Joi.object({
        email: Joi.string()
            .email({
                minDomainSegments: 2,
                tlds: { allow: ['com', 'net'] },
            })
            .trim()
            .pattern(/^\S*$/)
            .required()
            .error(new Error(constants.user.email.valid)),
        password: Joi.string()
            .pattern(
                new RegExp(
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
                )
            )
            .required()
            .error(new Error(constants.user.password.valid)),
    }).validate(req.body, { abortEarly: false }).error?.message;

    if (validation) {
        throw sendErr(Side.validation, validation);
    } else {
        const user: User = {
            email: req.body.email.trim().toLowerCase(),
            password: req.body.password,
        };
        res.locals.user = user;
        next();
    }
};

export default authUserValidator;
