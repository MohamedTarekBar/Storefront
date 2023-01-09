CREATE TABLE IF NOT EXISTS public.products
(
    id SERIAL,
    name character varying(50) NOT NULL,
    description character varying(255),
    price numeric(10,2) NOT NULL,
    category character varying(50),
    CONSTRAINT products_pkey PRIMARY KEY (id)
)