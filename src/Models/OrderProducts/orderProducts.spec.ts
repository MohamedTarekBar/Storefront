import { orderStatus } from '../../types/Order.type';
import OrderProducts from '../../types/OrderProducts.type';
import OrderModel from '../Order/order.model';
import ProductModel from '../Product/product.model';
import UserModel from '../User/user.model';
import OrderProductsModel, { userOrderProducts } from './orderProducts.model';

const model = new OrderProductsModel();
let oid: undefined | number;
let pid: undefined | number;
let op: OrderProducts | undefined = undefined;
const random = Math.floor(Math.random() * 100);

describe('testing Order Products Model', async () => {
    const createNeeded = async () => {
        const random = Math.floor(Math.random() * 1000);
        const u = await new UserModel().create({
            firstName: 'test',
            lastName: 'test2',
            email: `test${random}@test.com`,
            password: 'Test123@',
        });
        const o = await new OrderModel().create({
            userId: u.id as unknown as number,
            status: 'active' as unknown as orderStatus,
        });
        const p = await new ProductModel().create({
            name: 'SAMSUNG Fold',
            price: 21000,
        });
        oid = o.id;
        pid = p.id;
    };

    beforeAll(async () => {
        await createNeeded();
        op = await model.create({
            orderId: oid as unknown as number,
            productId: pid as unknown as number,
            qty: random
        }) ;
    });

    it('orderProducts updated -- update status', async () => {
        const updateOp: OrderProducts = {
            id: op?.id,
            orderId: oid as unknown as number,
            productId: pid as unknown as number,
            qty: random
        };
        const edit = await model.edit(updateOp);
        expect(edit.qty).toBeDefined();
    });

    it('show orderProducts', async () => {
        let show: userOrderProducts[] | undefined;
        try {
            show = await model.show({
                orderId: op?.orderId  as unknown as number,
                productId: op?.productId  as unknown as number
            });
        } catch (error) {
            console.log(error);
        }
        expect(show).toBeDefined();
    });

    it('index orderProducts', async () => {
        const index = await model.index();
        expect(index).toBeDefined();
    });

    it('delete orderProducts', async () => {
        try {
            await model.delete(op?.id as unknown as number);
            op = undefined;
        } catch (error) {
            console.log(error);
        }
        expect(op).toBeUndefined();
    });
});
