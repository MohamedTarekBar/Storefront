import { Router } from 'express';
import createOrderProducts from '../../../Handler/orderProducts/createOrder';
import indexOrderProducts from '../../../Handler/orderProducts/indexOrders';

const orderProdutsRoute = Router();

orderProdutsRoute.route('/').get(indexOrderProducts).post(createOrderProducts);

export default orderProdutsRoute;

