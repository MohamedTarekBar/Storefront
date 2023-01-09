import {NextFunction, Request, Response } from 'express';
import DeleteUser from '../../Models/user/delete';
import * as utils from '../../Utils/commonImports';

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    if (req.params && res.locals.token) {
        try {
            const user = await new DeleteUser().execute(res.locals.token,req.params);
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

export default deleteUser;