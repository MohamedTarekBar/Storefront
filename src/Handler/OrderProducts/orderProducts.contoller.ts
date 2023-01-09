import { NextFunction, Request, Response } from 'express';
import OrderProductsModel from '../../Models/OrderProducts/OrderProducts.model';
import successResponse from '../../Utils/sendSuccess.utils';

const model = new OrderProductsModel();


const createOrderProducts = async (
    _req: Request,
    res: Response,
    next: NextFunction
)=> {
    try {
        const orderProducts = await model.createOrderProducts(res.locals.orderProducts);
        return res.json(successResponse({ data: orderProducts }));
    } catch (error) {
        next(error);
    }
};

const indexOrderProducts = async (
    _req: Request,
    res: Response,
    next: NextFunction
)=> {
    try {
        const orderProducts = await model.indexOrderProducts();
        return res.json(successResponse({ data: orderProducts }));
    } catch (error) {
        next(error);
    }
};

const showOrderProducts = async (
    _req: Request,
    res: Response,
    next: NextFunction
)=> {
    try {
        const orderProducts = await model.showOrderProducts(res.locals.id);
        return res.json(successResponse({ data: orderProducts }));
    } catch (error) {
        next(error);
    }
};

export { createOrderProducts, indexOrderProducts, showOrderProducts };
