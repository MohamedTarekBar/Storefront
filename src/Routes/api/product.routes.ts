import { Router } from 'express';
import {
    createProduct,
    deleteProduct,
    editProduct,
    indexProducts,
    showProduct,
} from '../../Handler/Product/product.controller';
import createProductValidator from '../../Middleweres/Products/create.middlewere';
import deleteProductValidator from '../../Middleweres/Products/delete.middleware';
import editProductValidator from '../../Middleweres/Products/edit.middleware';
import showProductValidator from '../../Middleweres/Products/show.middlewere';

const productRoute = Router();
productRoute
    .route('/')
    .post(createProductValidator, createProduct)
    .get(indexProducts);
productRoute
    .route('/:id')
    .get(showProductValidator, showProduct)
    .put(editProductValidator, editProduct)
    .delete(deleteProductValidator, deleteProduct);
    
export default productRoute;
