import { NextFunction, Request, Response } from 'express';
import ProductModel from '../../Models/Product/product.model';
import successResponse from '../../Utils/sendSuccess.utils';

const model = new ProductModel();


const createProduct = async (
    _req: Request,
    res: Response,
    next: NextFunction
)=> {
    try {
        const product = await model.create(res.locals.product);
        return res.json(successResponse({ data: product }));
    } catch (error) {
        next(error);
    }
};

const indexProducts = async (
    req: Request,
    res: Response,
    next: NextFunction
)=> {
    try {
        const products = await model.index();
        return res.json(successResponse({ data: products }));
    } catch (error) {
        next(error);
    }
};

const showProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
)=> {
    try {
        const Product = await model.show(res.locals.id);
        return res.json(successResponse({ data: Product }));
    } catch (error) {
        next(error);
    }
};

export { createProduct, indexProducts, showProduct };
