import { NextFunction, Request, Response } from 'express';
import UserModel from '../../Models/User/user.model';
import successResponse from '../../Utils/sendSuccess.utils';

const model = new UserModel();

const createUser = async (
    __req: Request,
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
    _req: Request,
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
    _req: Request,
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
    _req: Request,
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

const deleteUser = async (
    _req: Request,
    res: Response,
    next: NextFunction
)=> {
    try {
        const user = await model.delete(res.locals.user);
        return res.json(successResponse({ data: user }));
    } catch (error) {
        next(error);
    }
};

const updateUser = async (
    _req: Request,
    res: Response,
    next: NextFunction
)=> {
    try {
        const user = await model.update(res.locals.user);
        return res.json(successResponse({ data: user }));
    } catch (error) {
        next(error);
    }
};

const changeUserPassword = async (
    _req: Request,
    res: Response,
    next: NextFunction
)=> {
    try {
        const user = await model.changePassword(res.locals.user);
        return res.json(successResponse({ data: user }));
    } catch (error) {
        next(error);
    }
};

export { createUser, authUser, indexUsers, showUser, deleteUser, updateUser , changeUserPassword};
