import { Router, Request, Response } from 'express';
import v1Route from './api';

const apiRoute = Router();
apiRoute.get('/', (req: Request, res: Response) => res.redirect('/'));
apiRoute.use('/v1', v1Route);
export default apiRoute;
