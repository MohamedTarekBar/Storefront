import { NextFunction, Request, Response } from 'express';
import OrderModel from '../../Models/Order/order.model';
import successResponse from '../../Utils/sendSuccess.utils';

const model = new OrderModel();

const createOrder = async (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const order = await model.create(res.locals.order);
        return res.json(successResponse({ data: order }));
    } catch (error) {
        next(error);
    }
};

const indexOrders = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const orders = await model.index();
        return res.json(successResponse({ data: orders }));
    } catch (error) {
        next(error);
    }
};

const showOrder = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const Order = await model.show(res.locals.id);
        return res.json(successResponse({ data: Order }));
    } catch (error) {
        next(error);
    }
};

const editOrder = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const Order = await model.edit(res.locals.order);
        return res.json(successResponse({ data: Order }));
    } catch (error) {
        next(error);
    }
};

const deleteOrder = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const order = await model.delete(res.locals.id);
        return res.json(successResponse({ data: order }));
    } catch (error) {
        next(error);
    }
};

export { createOrder, indexOrders, showOrder, editOrder, deleteOrder};
