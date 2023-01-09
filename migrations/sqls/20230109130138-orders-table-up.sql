CREATE TYPE status AS ENUM ('active', 'complete');
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS public.orders(
    id SERIAL PRIMARY KEY,
    status status default 'active',
    user_Id int NOT NULL REFERENCES users(id) ON DELETE CASCADE
);
