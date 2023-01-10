import { Router } from 'express';
import {
    createOrder,
    deleteOrder,
    editOrder,
    indexOrders,
    showOrder,
} from '../../Handler/Order/order.controller';
import createOrderValidator from '../../Middleweres/Orders/create.middlewere';
import deleteOrderValidator from '../../Middleweres/Orders/delete.middleware';
import editOrderValidator from '../../Middleweres/Orders/edit.middleware';
import showOrderValidator from '../../Middleweres/Orders/show.middlewere';

const orderRoute = Router();
orderRoute.route('/').post(createOrderValidator, createOrder).get(indexOrders);
orderRoute
    .route('/:id')
    .get(showOrderValidator, showOrder)
    .put(editOrderValidator, editOrder)
    .delete(deleteOrderValidator, deleteOrder);
    
export default orderRoute;
