import Joi, { ValidationResult } from 'joi';
import { globalConstants, Product } from '../commonImports';

export interface productInput {
    product: Product;
    name: string;
    price: number;
}

export default class ProductValidation {
    private product: Product | undefined;
    private name: string | undefined;
    private price: number | undefined;

    constructor(options?: Partial<productInput>) {
        this.product = options?.product;
        this.name = options?.name;
        this.price = options?.price;
    }

    validateProduct(): ValidationResult {
        return Joi.object({
            name: Joi.string()
                .min(3)
                .max(50)
                .trim()
                .pattern(/^\S*$/)
                .required()
                .error(new Error(globalConstants.productValidation.name)),
            price: Joi.number()
                .min(0)
                .required()
                .error(new Error(globalConstants.productValidation.price)),
        }).validate(this.product, { abortEarly: false });
    }

    validateName(): ValidationResult {
        return Joi.string()
            .min(3)
            .max(50)
            .trim()
            .pattern(/^\S*$/)
            .required()
            .error(new Error(globalConstants.productValidation.name))
            .validate(this.name);
    }

    validatePrice(): ValidationResult {
        return Joi.number()
            .min(0)
            .required()
            .error(new Error(globalConstants.productValidation.price))
            .validate(this.price);
    }
}
