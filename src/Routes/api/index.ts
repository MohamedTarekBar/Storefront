import { Router,Request,Response } from 'express';
import authenticationMiddlewere from '../../Middleweres/authentication.middlewere';
import orderProdutsRoute from './v1/orderProducts';
import ordersRoute from './v1/orders';
import productsRoute from './v1/products';
import usersRoute from './v1/users';

const v1Route = Router();
v1Route.get('/',(req:Request,res:Response)=> res.redirect('/'));
v1Route.use('/users', usersRoute);
v1Route.use('/products',authenticationMiddlewere, productsRoute);
v1Route.use('/orders',authenticationMiddlewere, ordersRoute);
v1Route.use('/order-products',authenticationMiddlewere, orderProdutsRoute);

export default v1Route;
