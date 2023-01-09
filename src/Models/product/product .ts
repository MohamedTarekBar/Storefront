import * as utils from '../../Utils/commonImports';
import Connect from '../../database/connect';

export default class Product {
    product: utils.Product | undefined;

    constructor(product?: utils.Product) {
        this.product = product;
    }

    validateProduct = (
        product: utils.Product | undefined
    ): string | undefined => {
        if (product && product.name && product.price) {
            const validation = new utils.ProductValidation({
                name: product.name,
                price: product.price,
            });
            const name = validation.validateName().error?.message;
            const price = validation.validatePrice().error?.message;

            if (name || price) {
                return name || price;
            } else {
                return undefined;
            }
        } else {
            return utils.globalConstants.missingParams.params;
        }
    };

    async create() {
        const sql =
            'INSERT INTO products (name , price , category, description) values ($1,$2,$3,$4) returning *';
        const error = this.validateProduct(this.product);
        if (error) {
            throw utils.errorResponse.json(utils.ErrorSide.validation, error);
        } else {
            try {
                const result = await Connect.result(sql, [
                    this.product?.name,
                    this.product?.price,
                    this.product?.category,
                    this.product?.description,
                ]);

                if (result.rows.length) {
                    this.product = result.rows[0];
                    return this.product as utils.Product;
                } else {
                    throw utils.errorResponse.json(
                        utils.ErrorSide.service,
                        utils.globalConstants.unexpectedError.service
                    );
                }
            } catch (error) {
                throw utils.errorResponse.json(utils.ErrorSide.database, error);
            }
        }
    }

    async index(): Promise<Product[]> {
        const sql = 'SELECT * FROM products';
        const result = await Connect.result(sql);

        if (result.rows.length) {
            return result.rows;
        } else {
            throw utils.errorResponse.json(
                utils.ErrorSide.service,
                utils.globalConstants.unexpectedError.service
            );
        }
    }

    async edit(id: string): Promise<Product> {
        const error = this.validateProduct(this.product);
        if (error) {
            throw utils.errorResponse.json(utils.ErrorSide.validation, error);
        } else {
            try {
                const sql =
                    'UPDATE products SET name=$1, description=$2, price=$3, category=$4 WHERE id=$5 RETURNING *';
                const result = await Connect.result(sql, [
                    this.product?.name,
                    this.product?.description,
                    this.product?.price,
                    this.product?.category,
                    id,
                ]);
                if (result.rows.length) {
                    return result.rows[0];
                } else {
                    throw utils.errorResponse.json(
                        utils.ErrorSide.service,
                        utils.globalConstants.unexpectedError.service
                    );
                }
            } catch (err) {
                throw utils.errorResponse.json(
                    utils.ErrorSide.database,
                    err
                );
            }
        }
    }

    async delete(id: number): Promise<Product> {
        try {
            const sql = 'DELETE FROM products WHERE id=($1) RETURNING *';
            const result = await Connect.result(sql, [id]);
            return result.rows[0];
        } catch (err) {
            throw utils.errorResponse.json(
                utils.ErrorSide.database,
                err
            );
        }
    }

    async show(id: number): Promise<Product> {
        try {
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const result = await Connect.result(sql, [id]);
            return result.rows[0];
        } catch (err) {
            throw utils.errorResponse.json(
                utils.ErrorSide.database,
                err
            );
        }
    }
}
