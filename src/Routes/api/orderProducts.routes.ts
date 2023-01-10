import { Router } from 'express';
import {
    createOrderProducts,
    deleteOrderProducts,
    editOrderProducts,
    indexOrderProducts,
    showOrderProducts,
} from '../../Handler/OrderProducts/orderProducts.contoller';
import createOrderProductsValidator from '../../Middleweres/Order_Products/create.middlewere';
import deleteOrderProductsValidator from '../../Middleweres/Order_Products/delete.middleware';
import editOrderProductsValidator from '../../Middleweres/Order_Products/edit.middleware';
import showOrderProductsValidator from '../../Middleweres/Order_Products/show.middlewere';

const orderProductsRoute = Router();
orderProductsRoute
    .route('/')
    .post(createOrderProductsValidator, createOrderProducts)
    .get(indexOrderProducts);
orderProductsRoute
    .route('/:orderId/product/:productId')
    .get(showOrderProductsValidator, showOrderProducts);
orderProductsRoute
    .route('/:id')
    .put(editOrderProductsValidator, editOrderProducts)
    .delete(deleteOrderProductsValidator, deleteOrderProducts);
export default orderProductsRoute;
