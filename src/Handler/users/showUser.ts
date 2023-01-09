import {NextFunction, Request, Response } from 'express';
import Get from '../../Models/user/get';
import * as utils from '../../Utils/commonImports';

const showUser = async (req: Request, res: Response, next: NextFunction) => {
    if (req.params) {
        try {
            const user = await new Get().execute(req.params);
            if (user) {
                res.json(utils.successResponse({data: user}));
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

export default showUser;