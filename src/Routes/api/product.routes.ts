import { Router } from 'express';
import { createProduct, indexProducts, showProduct } from '../../Handler/Product/product.controller';
import createProductValidator from '../../Middleweres/Products/create.middlewere';
import showProductValidator from '../../Middleweres/Products/show.middlewere';

const productRoute = Router();
productRoute.route('/').post(createProductValidator,createProduct).get(indexProducts);
productRoute.route('/:id').get(showProductValidator,showProduct);
export default productRoute;
