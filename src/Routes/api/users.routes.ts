import { Router } from 'express';
import {
    authUser,
    changeUserPassword,
    createUser,
    deleteUser,
    indexUsers,
    showUser,
    updateUser,
} from '../../Handler/User/user.controller';
import authenticationMiddleware from '../../Middleweres/authentication.middleware';
import authUserValidator from '../../Middleweres/User/auth.middleware';
import changePasswordUserValidator from '../../Middleweres/User/changePassword.middleware';
import createUserValidator from '../../Middleweres/User/create.middleware';
import deleteUserValidator from '../../Middleweres/User/delete.middleware';
import showUserValidator from '../../Middleweres/User/show.middleware';
import updateUserValidator from '../../Middleweres/User/update.middleware';

const userRoute = Router();
userRoute.route('/').post(createUserValidator, createUser).get(authenticationMiddleware,indexUsers);
userRoute.route('/auth').post(authUserValidator, authUser);
userRoute.use(authenticationMiddleware);
userRoute
    .route('/:id')
    .get(showUserValidator, showUser)
    .delete(deleteUserValidator, deleteUser)
    .put(updateUserValidator, updateUser);
userRoute
    .route('/password/:id')
    .put(changePasswordUserValidator, changeUserPassword);

export default userRoute;
