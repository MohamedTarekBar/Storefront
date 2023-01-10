import User from '../../types/User.type';
import UserModel from './user.model';

const model = new UserModel();
let user : User | undefined = undefined;

describe('Testing User Model', async () => {
    it('createUser', async () => {
        user = await model.create({
            firstName: 'Mohamed',
            lastName: 'Tarek',
            email: 'MohamedStarek@YahoO.com',
            password: 'Aa112233!'
        });
        expect(user).toBeDefined();
    });
    it('authUser', async () => {
        const loginUser = await model.auth({
            email: 'MohamedStarek@YahoO.com',
            password: 'Aa112233!'
        });
        (user as User).token = loginUser.token;
        expect(loginUser.token).toBeDefined();
    });
    it('update user info', async () => {
        const updatedUser = await model.update({
            id: user?.id,
            firstName: 'hamada',
            token:user?.token
        });
        expect(updatedUser.firstName).toBe('hamada');
    });
    it('change user password', async () => {
        const updatedUser = await model.changePassword({
            id: user?.id,
            password: 'Abc123@',
            token:user?.token
        });
        expect(updatedUser).toBeDefined();
    });
    it('index users', async () => {
        const users = await model.index();
        expect(users.length).toBeGreaterThan(0);
    });
    it('show user', async () => {
        const showUser = await model.show(user?.id as unknown as number);
        expect(showUser).toBeDefined();
    });
    it('delete user', async () => {
        const deleteUser = await model.delete({
            id: user?.id,
            token:user?.token
        });
        expect(deleteUser).toBeDefined();
    });
});
