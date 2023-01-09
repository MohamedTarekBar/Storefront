import { Request, Response, NextFunction } from 'express';
import * as utils from '../Utils/commonImports';

const authenticationMiddlewere = (
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
                const isVerified = utils.token.verify(userToken);
                if (isVerified) {
                    res.locals.token = userToken;
                    next();
                } else {
                    throw utils.errorResponse.json(
                        utils.ErrorSide.security,
                        utils.globalConstants.tokenError.notVerified
                    );
                }
            } catch (error) {
                throw utils.errorResponse.json(utils.ErrorSide.security, error);
            }
        } else {
            throw utils.errorResponse.json(
                utils.ErrorSide.security,
                utils.globalConstants.tokenError.notProvided
            );
        }
    } else {
        throw utils.errorResponse.json(
            utils.ErrorSide.security,
            utils.globalConstants.tokenError.notProvided
        );
    }
};

export default authenticationMiddlewere;
