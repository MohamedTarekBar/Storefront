import dotenv from 'dotenv';
dotenv.config();

const {
    PORT,
    NODE_ENV,
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_DB_TEST,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    BYCRYPT_PASSWORD,
    SALT_ROUNDS,
    TOKEN_SECRET,
    ORIGINS,
} = process.env;

export default {
    port: PORT,
    env: NODE_ENV,
    hostpg: POSTGRES_HOST,
    db: POSTGRES_DB,
    dbtest: POSTGRES_DB_TEST,
    user: POSTGRES_USER,
    pass: POSTGRES_PASSWORD,
    pepper: BYCRYPT_PASSWORD,
    salt: SALT_ROUNDS,
    token: TOKEN_SECRET,
    origin: ORIGINS,
};
