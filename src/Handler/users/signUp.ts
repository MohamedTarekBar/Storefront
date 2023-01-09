import {NextFunction, Request, Response } from 'express';
import SignUp from '../../Models/user/signup';
import * as utils from '../../Utils/commonImports';

const signUp = async (req: Request, res: Response, next: NextFunction) => {
    const data = utils.getData(req);
    if (data) {
        try {
            const user = await new SignUp(data).execute();
            if (user) {
                res.json(
                    utils.successResponse({ data: user})
                );
            } else {
                next(utils.errorResponse.json(utils.ErrorSide.service,utils.globalConstants.unexpectedError.database));
            }
        } catch (error) {
            next (error);
        } 
    } else {
        next(utils.errorResponse.json(utils.ErrorSide.validation,utils.globalConstants.missingParams.user));
    }
};

export default signUp;