/* eslint-disable no-useless-escape */
import supertest from 'supertest';
import app from '../server';
const request = supertest(app);
let token: string | undefined = undefined;

describe('Test Endpoints', () => {
    beforeAll(async () => {
        const user = {
            firstName: 'Mohamed',
            lastName: 'Tarek',
            email: 'Mohamed@yahoo.com',
            password: 'Aa112233!',
        };
        await request.post('/api/users').send(user);
        const auth = await request
            .post('/api/users/auth')
            .send({ email: user.email, password: user.password });
        token = auth.body.data.token;
    });

    it('Found redirect to api document_postman ', async () => {
        const server = await request.get('/');
        const api = await request.get('/api');
        expect(server.status).toBe(302);
        expect(api.status).toBe(302);
    });

    it('Testing routes without token (Authoriztion Not Provided)', async () => {
        const users = await request.get('/api/users');
        const orders = await request.get('/api/orders');
        const products = await request.get('/api/products');
        const order_products = await request.get('/api/order-products');
        expect(users.status).toBe(403);
        expect(orders.status).toBe(403);
        expect(products.status).toBe(403);
        expect(order_products.status).toBe(403);
    });

    it('Testing routes with valid token', async () => {
        await request
            .get('/api/users')
            .set('Authorization', 'bearer ' + token)
            .expect(200);
        const orders = await request
            .get('/api/orders')
            .set('Authorization', 'bearer ' + token);
        if (orders.body.data) {
            expect(orders.status).toBe(200);
        }else {
            expect(orders.status).toBe(502);
        }
    });

    it('Testing routes with invalid token', async () => {
        const token =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
        await request
            .get('/api/users')
            .set('Authorization', 'bearer ' + token)
            .expect(403);
    });

    it('Testing routes with incorrect token type', async () => {
        const token = 'fake';
        await request
            .get('/api/users')
            .set('Authorization', 'bearer ' + token)
            .expect(403);
    });

    it('Testing create user endpoint without passing user object', async () => {
        const users = await request.post('/api/users');
        expect(users.status).toBe(400);
    });
});

export { token };
