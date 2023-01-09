import { NextFunction, Request, Response } from 'express';
import Product from '../../Models/product/product ';
import * as utils from '../../Utils/commonImports';

const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    const data = utils.getData(req);
    try {
        const product = await new Product(data).create();
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
};

export default createProduct;
