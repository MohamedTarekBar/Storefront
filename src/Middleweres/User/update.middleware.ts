import constants from '../../Utils/errorConstants.utils';
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import sendErr, { Side } from '../../Utils/sendError.utils';
import User from '../../types/User.type';

const updateUserValidator = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const validation = Joi.object({
        id: Joi.number()
            .min(0)
            .required()
            .error(new Error(constants.user.id.valid)),
        email: Joi.string()
            .email({
                minDomainSegments: 2,
                tlds: { allow: ['com', 'net'] },
            })
            .trim()
            .pattern(/^\S*$/)
            .error(new Error(constants.user.email.valid)),
        firstName: Joi.string()
            .min(3)
            .max(50)
            .trim()
            .pattern(/^\S*$/)
            .error(new Error(constants.user.firstName.valid)),
        lastName: Joi.string()
            .min(3)
            .max(50)
            .trim()
            .pattern(/^\S*$/)
            .error(new Error(constants.user.lastName.valid)),
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
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
        },
        { abortEarly: false }
    ).error?.message;
    if (validation) {
        throw sendErr(Side.validation, validation);
    } else {
        const user: User = {
            id: req.params.id as unknown as number,
            firstName: req.body.firstName ? req.body.firstName.trim(): undefined,
            lastName: req.body.lastName ? req.body.lastName.trim(): undefined,
            email: req.body.email ? req.body.email.trim(): undefined,
            token: res.locals.token
        };
        res.locals.user = user;
        next();
    }
};

export default updateUserValidator;
