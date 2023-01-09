import { Router } from 'express';
import { createOrder, indexOrders, showOrder } from '../../Handler/Order/order.controller';
import createOrderValidator from '../../Middleweres/Orders/create.middlewere';
import showOrderValidator from '../../Middleweres/Orders/show.middlewere';

const orderRoute = Router();
orderRoute.route('/').post(createOrderValidator,createOrder).get(indexOrders);
orderRoute.route('/:id').get(showOrderValidator,showOrder);
export default orderRoute;
