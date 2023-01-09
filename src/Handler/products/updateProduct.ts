import { NextFunction, Request, Response } from 'express';
import Product from '../../Models/product/product ';
import * as utils from '../../Utils/commonImports';
const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    const data = utils.getData(req);
    if (req.params.id) {
        try {
            const product = await new Product(data).edit(req.params.id);
            if (product) {
                res.json(utils.successResponse({ data: product}));
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
        next(utils.errorResponse.json(utils.ErrorSide.validation,utils.globalConstants.missingParams.params));
    }
};
export default updateProduct;