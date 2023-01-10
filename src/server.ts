import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import api from './Routes';
import errorMiddlewere from './Middleweres/error.middleware';
import sendErr, { Side } from './Utils/sendError.utils';
import constants from './Utils/errorConstants.utils';
const app: Application = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(morgan('dev', { skip: () => process.env.NODE_ENV === 'test' }));
app.use(cors());
app.use(helmet());
app.use('/api', api);
app.get('/', (_req: Request, res: Response) => {
    res.status(200).redirect('https://documenter.getpostman.com/view/13127908/2s8Z76uUSG');
});
app.use(() => {
    throw sendErr(Side.page404, constants.default.pageNotFound);
});
app.use(errorMiddlewere);
app.listen(PORT, () => {
    const server = 'http://localhost:3000';
    console.log(`app is running on ${server} -- ${process.env.NODE_ENV}`);
});
export default app;
