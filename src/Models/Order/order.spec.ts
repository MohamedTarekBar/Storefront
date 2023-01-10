import Order, { orderStatus } from '../../types/Order.type';
import UserModel from '../User/user.model';
import OrderModel from './order.model';

const model = new OrderModel();
let order: Order | undefined = undefined;
let userId: number | undefined = undefined;

const createUser = async () => {
    const u = await new UserModel().create({
        firstName: 'test',
        lastName: 'test2',
        email: 'test@test.com',
        password: 'Test123@'
    });
    userId = u.id;
};

describe('testing orderModel', async() => {
    beforeAll(async () => {
        await createUser();
        const o: Order = {
            userId: userId as unknown as number,
            status: 'active' as unknown as orderStatus,
        };
        const create = await model.create(o);
        order = {
            id: create.id,
            ... o
        };
        expect(create).toBeDefined();
    });
    
    it('order updated -- update status', async () => {
        const o: Order = {
            id: order?.id as unknown as number,
            userId: order?.userId as unknown as number,
            status: 'complete' as unknown as orderStatus,
        };
        const edit = await model.edit(o);
        expect(edit.status).toBe('complete' as unknown as orderStatus);
    });

    it('show order', async() => {
        const id = 1;
        const show = await model.show(id);
        expect(show).toBeDefined();
    });

    it('index order', async() => {
        const index = await model.index();
        expect(index).toBeDefined();
    });

    it('delete order', async ()=>{
        try {
            await model.delete(order?.id as unknown as number);
            order = undefined;
        } catch (error) {
            console.log(error);
        }
    });
});

