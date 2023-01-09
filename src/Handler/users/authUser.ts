import { NextFunction, Request, Response } from 'express';
import SignIn from '../../Models/user/signIn';
import * as utils from '../../Utils/commonImports';

const authUser = async (req: Request, res: Response, next: NextFunction) => {
    const data = utils.getData(req);
    if (data && data.email && data.password) {
        try {
            const user = await new SignIn(data.email, data.password).execute();
            if (user) {
                res.json(
                    utils.successResponse({ data: user })
                );
            } else {
                next(
                    utils.errorResponse.json(
                        utils.ErrorSide.service,
                        utils.globalConstants.unexpectedError.database
                    )
                );
            }
        } catch (error) {
            next(error);
        }
    } else {
        next(
            utils.errorResponse.json(
                utils.ErrorSide.validation,
                utils.globalConstants.missingParams.auth
            )
        );
    }
};

export default authUser;
