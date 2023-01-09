import { Router, Request, Response } from 'express';
import authenticationMiddleware from '../Middleweres/authentication.middleware';
import orderProductsRoute from './api/orderProducts.routes';
import orderRoute from './api/orders.routes';
import productRoute from './api/product.routes';
import usersRoute from './api/users.routes';
const api = Router();

api.get('/', (req: Request, res: Response) => res.redirect('/'));
api.use('/users', usersRoute);
api.use('/products', authenticationMiddleware, productRoute);
api.use('/orders', authenticationMiddleware, orderRoute);
api.use('/order-products', authenticationMiddleware, orderProductsRoute);

export default api;
 