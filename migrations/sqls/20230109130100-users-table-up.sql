CREATE TABLE IF NOT EXISTS public.users ( 
    id Serial PRIMARY KEY,
    email character varying(50) UNIQUE,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    password character varying(255) NOT NULL,
    token text
);