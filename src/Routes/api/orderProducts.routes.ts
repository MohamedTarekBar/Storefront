import { Router } from 'express';
import { createOrderProducts, indexOrderProducts, showOrderProducts } from '../../Handler/OrderProducts/orderProducts.contoller';
import createOrderProductsValidator from '../../Middleweres/Order_Products/create.middlewere';
import showOrderProductsValidator from '../../Middleweres/Order_Products/show.middlewere';

const orderProductsRoute = Router();
orderProductsRoute.route('/').post(createOrderProductsValidator,createOrderProducts).get(indexOrderProducts);
orderProductsRoute.route('/:id').get(showOrderProductsValidator,showOrderProducts);
export default orderProductsRoute;
