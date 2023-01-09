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
        const product = await model.createProduct(res.locals.product);
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
        const products = await model.indexProducts();
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
        const Product = await model.showProduct(res.locals.id);
        return res.json(successResponse({ data: Product }));
    } catch (error) {
        next(error);
    }
};

export { createProduct, indexProducts, showProduct };
