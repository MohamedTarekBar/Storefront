import { NextFunction, Request, Response } from 'express';
import OrderModel from '../../Models/Order/order.model';
import successResponse from '../../Utils/sendSuccess.utils';

const model = new OrderModel();


const createOrder = async (
    _req: Request,
    res: Response,
    next: NextFunction
)=> {
    try {
        const order = await model.createOrder(res.locals.order);
        return res.json(successResponse({ data: order }));
    } catch (error) {
        next(error);
    }
};

const indexOrders = async (
    req: Request,
    res: Response,
    next: NextFunction
)=> {
    try {
        const orders = await model.indexOrders();
        return res.json(successResponse({ data: orders }));
    } catch (error) {
        next(error);
    }
};

const showOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
)=> {
    try {
        const Order = await model.showOrder(res.locals.id);
        return res.json(successResponse({ data: Order }));
    } catch (error) {
        next(error);
    }
};

export { createOrder, indexOrders, showOrder };
