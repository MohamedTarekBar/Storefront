CREATE TYPE status AS ENUM ('active', 'complete');
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS public.orders(
    id SERIAL PRIMARY KEY,
    status status default 'active',
    user_uid uuid NOT NULL REFERENCES users(uid) ON DELETE CASCADE
);

