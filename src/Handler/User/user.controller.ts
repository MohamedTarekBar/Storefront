import { NextFunction, Request, Response } from 'express';
import UserModel from '../../Models/User/user.model';
import successResponse from '../../Utils/sendSuccess.utils';

const model = new UserModel();

const createUser = async (
    _req: Request,
    res: Response,
    next: NextFunction
)=> {
    try {
        const user = await model.create(res.locals.user);
        return res.json(successResponse({ data: user }));
    } catch (error) {
        next(error);
    }
};

const authUser = async (
    req: Request,
    res: Response,
    next: NextFunction
)=> {
    try {
        const user = await model.auth(res.locals.user);
        return res.json(successResponse({ data: user }));
    } catch (error) {
        next(error);
    }
};

const indexUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
)=> {
    try {
        const users = await model.index();
        return res.json(successResponse({ data: users }));
    } catch (error) {
        next(error);
    }
};

const showUser = async (
    req: Request,
    res: Response,
    next: NextFunction
)=> {
    try {
        const user = await model.show(res.locals.id);
        return res.json(successResponse({ data: user }));
    } catch (error) {
        next(error);
    }
};

export { createUser, authUser, indexUsers, showUser };
