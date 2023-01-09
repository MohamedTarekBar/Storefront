import { Request, Response, NextFunction } from 'express';
import Error from '../types/interface/error.interface';

const errorMiddlewere = (
    err: Error,
    _req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: NextFunction
) => {
    const status = err.status || 500;
    const message = err.message || 'whoops somsething went wrong';
    res.status(status).json({ status, message });
};

export default errorMiddlewere;
