import { Router } from 'express';
import createOrder from '../../../Handler/orders/createOrder';
import deleteOrder from '../../../Handler/orders/deleteOrder';
import indexOrders from '../../../Handler/orders/indexOrders';
import showOrder from '../../../Handler/orders/showOrder';
import updateOrder from '../../../Handler/orders/updateProduct';

const ordersRoute = Router();

ordersRoute.route('/').get(indexOrders).post(createOrder);
ordersRoute.route('/:id').get(showOrder).put(updateOrder).delete(deleteOrder);
export default ordersRoute;

