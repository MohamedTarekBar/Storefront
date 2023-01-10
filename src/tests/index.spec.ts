import supertest from 'supertest';
import app from '../server';

// create a request object
const request = supertest(app);

describe('Test Endpoints', () => {
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

    it('Testing create user endpoint without passing user object', async () => {
        const users = await request.post('/api/users');
        expect(users.status).toBe(400);
    });

    it('Testing create user endpoint with passing user object', async () => {
        const user = {
            firstName: 'Mohamed',
            lastName: 'Tarek',
            email: 'Mohamed@yahoo.com',
            password: 'Aa112233!',
        };
        const create = await request.post('/api/users').send(user);
        expect(create.status).toBe(200);
    });
});
