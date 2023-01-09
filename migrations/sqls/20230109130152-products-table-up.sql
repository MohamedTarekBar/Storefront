/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS public.products
(
    id SERIAL,
    name character varying(50) NOT NULL,
    price numeric(10,2) NOT NULL,
    CONSTRAINT products_pkey PRIMARY KEY (id)
)