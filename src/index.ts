import express, { Application } from 'express';
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
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use('/api', api);
app.use(()=>{
    throw sendErr(Side.page404,constants.default.pageNotFound);
});
app.use(errorMiddlewere);
app.listen(PORT, () => {
    const server = '::::3000';
    console.log('app is running on' + server);
});
export default app;
