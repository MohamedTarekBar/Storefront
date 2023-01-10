import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let client: Pool = new Pool();

const {
    NODE_ENV,
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_DB_TEST,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
} = process.env;

if (NODE_ENV === 'dev') {
    client = new Pool({
        database: POSTGRES_DB,
        host: POSTGRES_HOST,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    });
} else if (NODE_ENV === 'test') {
    client = new Pool({
        database: POSTGRES_DB_TEST,
        host: POSTGRES_HOST,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    });
} else {
    console.log('error /config');
}

client.on('error', (error) => {
    console.log(error + '/from database');
});

export default client;
