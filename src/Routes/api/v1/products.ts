import { Router } from 'express';
import createProduct from '../../../Handler/products/createProduct';
import deleteProduct from '../../../Handler/products/deleteProduct';
import indexProducts from '../../../Handler/products/indexProducts';
import showProduct from '../../../Handler/products/showProducts';
import updateProduct from '../../../Handler/products/updateProduct';

const productsRoute = Router();

productsRoute.route('/').get(indexProducts).post(createProduct);
productsRoute.route('/:id').get(showProduct).put(updateProduct).delete(deleteProduct);

export default productsRoute;

