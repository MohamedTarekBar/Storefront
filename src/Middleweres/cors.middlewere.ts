import { Application, Router } from 'express';
import cors from 'cors';
import config from '../Configs/config';

const corsOptions = {
    origin: config.origin,
};

const corsMiddlewere = (app: Application | Router): void => {
    app.use(cors(corsOptions));
};

export default corsMiddlewere;
