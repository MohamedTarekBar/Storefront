import Product from '../../types/Product.type';
import ProductModel from './product.model';

const model = new ProductModel();
let product: Product | undefined = undefined;

describe('testing productModel', async () => {
    beforeAll(async () => {
        const p: Product = {
            name: 'Iphone 14 pro max',
            price: 40000.24,
        };
        const create = await model.create(p);
        product = create;
        expect(create).toBeDefined();
    });

    it('product updated -- update status', async () => {
        const o: Product = {
            id: product?.id as unknown as number,
            name: 'Iphone 13 pro max',
            price: 23000.77,
        };
        const edit = await model.edit(o);
        expect(parseFloat(edit.price as unknown as string)).toBe(23000.77);
    });

    it('show product', async () => {
        const id = 1;
        const show = await model.show(id);
        expect(show).toBeDefined();
    });

    it('index product', async () => {
        const index = await model.index();
        expect(index).toBeDefined();
    });

    it('delete product', async () => {
        try {
            await model.delete(product?.id as unknown as number);
            product = undefined;
        } catch (error) {
            console.log(error);
        }
    });
});
