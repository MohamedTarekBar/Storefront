import { Request, Response, NextFunction } from 'express';
import constants from '../Utils/errorConstants.utils';
import sendErr, { Side } from '../Utils/sendError.utils';
import token from '../Utils/token.utils';
const authenticationMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.get('Authorization');
    if (authHeader) {
        const bearer = authHeader.split(' ')[0].toLowerCase();
        const userToken = authHeader.split(' ')[1];
        if (userToken && bearer === 'bearer') {
            try {
                const isVerified = token.verify(userToken);
                if (isVerified) {
                    res.locals.token = userToken;
                    next();
                } else {
                    throw sendErr(Side.security, constants.token.verify);
                }
            } catch (error) {
                throw sendErr(Side.security, error);
            }
        } else {
            throw sendErr(Side.security, constants.token.provide);
        }
    } else {
        throw sendErr(Side.security, constants.token.provide);
    }
};

export default authenticationMiddleware;
