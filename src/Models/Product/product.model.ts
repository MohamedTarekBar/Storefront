import connect from '../../database/connect';
import Product from '../../types/Product.type';
import constants from '../../Utils/errorConstants.utils';
import sendErr, { Side } from '../../Utils/sendError.utils';

class ProductModel {
    createProduct = async (product: Product): Promise<Product> => {
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
    
    showProduct = async (id: number): Promise<Product> => {
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
    indexProducts = async (): Promise<Product[]> => {
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
}

export default ProductModel;
