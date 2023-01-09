import { NextFunction, Request, Response } from 'express';
import UpdateUser from '../../Models/user/update';
import * as utils from '../../Utils/commonImports';

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    const data = utils.getData(req);

    if (req.params.uid && res.locals.token) {
        try {
            const user = await new UpdateUser(req.params.uid,data.email,data.password,res.locals.token).execute();
            if (user) {
                res.json(utils.successResponse({data: user}));
            } else {
                next(utils.errorResponse.json(utils.ErrorSide.service,utils.globalConstants.unexpectedError.database));
            }
        } catch (error) {
            next (error);
        }
    } else {
        next(utils.errorResponse.json(utils.ErrorSide.validation,utils.globalConstants.missingParams.uid));
    }
};

export default updateUser;
