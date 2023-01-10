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
        const orderProducts = await model.create(res.locals.orderProducts);
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
        const orderProducts = await model.index();
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
        const orderProducts = await model.show(res.locals.orderProducts);
        return res.json(successResponse({ data: orderProducts }));
    } catch (error) {
        next(error);
    }
};

const editOrderProducts = async (
    _req: Request,
    res: Response,
    next: NextFunction
)=> {
    try {
        console.log(res.locals.orderProducts);
        const orderProducts = await model.edit(res.locals.orderProducts);
        return res.json(successResponse({ data: orderProducts }));
    } catch (error) {
        next(error);
    }
};

const deleteOrderProducts = async (
    _req: Request,
    res: Response,
    next: NextFunction
)=> {
    try {
        const orderProducts = await model.delete(res.locals.id);
        return res.json(successResponse({ data: orderProducts }));
    } catch (error) {
        next(error);
    }
};

export { createOrderProducts, indexOrderProducts, showOrderProducts, editOrderProducts, deleteOrderProducts };
