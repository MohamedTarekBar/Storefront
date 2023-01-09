import { NextFunction, Request, Response } from 'express';
import GetAllUser from '../../Models/user/getAll';
import * as utils from '../../Utils/commonImports';

const indexUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await new GetAllUser().execute();
        if (users) {
            res.json(utils.successResponse({ data: users }));
        } else {
            //
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
};

export default indexUsers;
