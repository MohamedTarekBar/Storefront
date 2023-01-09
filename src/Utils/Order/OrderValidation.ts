import Joi, { ValidationResult } from 'joi';
import { globalConstants, Order } from '../commonImports';


export default class OrderValidation {
    private order: Order | undefined;

    constructor(order: Order) {
        this.order = order;
    }

    validateOrder(): ValidationResult {
        return Joi.object({
            status: Joi.string().valid('active','complete')
                .pattern(/^\S*$/)
                .required()
                .error(new Error(globalConstants.orderValidation.status)),
            user_uid: Joi.string()
                .required()
                .error(new Error(globalConstants.orderValidation.uid)),
        }).validate(this.order, { abortEarly: false });
    }
}
