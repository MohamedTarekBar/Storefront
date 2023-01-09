import connect from '../../database/connect';
import Product from '../../types/Product.type';
import constants from '../../Utils/errorConstants.utils';
import sendErr, { Side } from '../../Utils/sendError.utils';

class ProductModel {
    create = async (product: Product): Promise<Product> => {
        try {
            const sql = 'INSERT INTO products (name, price) values ($1,$2) returning *';
            const result = await connect.result(sql,[product.name,product.price]);
            if(result.rows.length) {
                const p = result.rows[0];
                return {
                    id: p.id,
                    name: p.name,
                    price: (parseFloat(p.price)) as unknown as number
                };
            } else {
                throw sendErr(Side.database, constants.default.noDataFound);
            }
        } catch (error) {
            throw sendErr(Side.database, error);
        }
    };
    show = async (id: number): Promise<Product> => {
        try {
            const sql = 'SELECT * from products WHERE id=$1';
            const result = await connect.result(sql,[id]);
            if(result.rows.length) {
                return result.rows[0];
            } else {
                throw sendErr(Side.database, constants.default.noDataFound);
            }
        } catch (error) {
            throw sendErr(Side.database, error);
        }
    };
    index = async (): Promise<Product[]> => {
        try {
            const sql = 'SELECT * from products';
            const result = await connect.result(sql);
            if(result.rows.length) {
                return result.rows;
            } else {
                throw sendErr(Side.database, constants.default.noDataFound);
            }
        } catch (error) {
            throw sendErr(Side.database, error);
        }
    };
    delete = async(id: number): Promise<Product> => {
        try {
            const sql = 'DELETE FROM products WHERE id=$1 RETURNING *';
            const result = await connect.result(sql, [id]);
            if (result.rows.length) {
                return result.rows[0];
            } else {
                throw sendErr(Side.database, constants.default.noDataFound);
            }
        } catch (err) {
            throw sendErr(Side.database, err);
        }
    };
    edit = async(product: Product): Promise<Product> => {
        try {
            const sql = 'Update products SET name=$1, price=$2 WHERE id=$3 RETURNING *';
            const defaultProduct = await this.show(product.id as number);
            const result = await connect.result(sql,[
                product.name || defaultProduct.name,
                product.price || defaultProduct.price,
                product.id
            ]);
            if (result.rows.length) {
                return result.rows[0];
            } else {
                throw sendErr(Side.database, constants.default.noDataFound);
            }
        } catch (err) {
            throw sendErr(Side.database, err);
        }
    };
}

export default ProductModel;
