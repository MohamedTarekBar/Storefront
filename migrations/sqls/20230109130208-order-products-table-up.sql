CREATE TABLE IF NOT EXISTS public.order_products
(
    id SERIAL PRIMARY KEY,
    order_id integer NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE ON UPDATE CASCADE,
    product_id integer NOT NULL REFERENCES public.products(id) ON DELETE CASCADE ON UPDATE CASCADE,
    qty integer
)
